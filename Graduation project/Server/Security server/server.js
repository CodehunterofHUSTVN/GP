const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
const router = jsonServer.router("./users.json");

const SECRET_KEY = "209012";
const expiresIn = "2h";

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
};

const isUnique = ({ name, email }) => {
  return (
    userdb.users.findIndex(
      (user) => user.name === name || user.email === email
    ) !== -1
  );
};

const isAuthenticated = ({ name, password }) => {
  return (
    userdb.users.findIndex(
      (user) => user.name === name && user.password === password
    ) !== -1
  );
};

const findUser = (name)=>{
  return userdb.logs.findIndex(
    (user) => user.name === name && user.status === undefined )
}

server.post("/check", (req, res) => {
  const { name, email } = req.body;
  if (isUnique({ name, email }) !== false) {
    res.status(200).json("USERNAME OR EMAIL IS EXISTED");
    return;
  }
  res.status(200).json("OK! IT'S FINE");
});

server.post("/users", (req, res) => {
  req.body.id = userdb.users.length;
  userdb.users.unshift(req.body);
  fs.writeFileSync("./users.json", JSON.stringify(userdb));
});

server.post("/auth/login", (req, res) => {
  const { name, password } = req.body;
  if (isAuthenticated({ name, password }) === false) {
    res.status(200).json("INCORRECT USERNAME OR PASSWORD");
    return;
  }
  const accessToken = createToken({ name, password });
  res.status(200).json({ token: accessToken, message: "WELCOME" });
});

server.post("/logs", (req, res) => {
  if(req.body.status===undefined){
    userdb.logs.unshift(req.body);
    fs.writeFileSync("./users.json", JSON.stringify(userdb));
    return;
  }
  const index = findUser(req.body.name);
  userdb.logs[index].status = req.body.status;
  userdb.logs[index].timeout = req.body.timeout;
  fs.writeFileSync("./users.json", JSON.stringify(userdb));
  res.status(200).json("DONE");
});

server.get("/logs", (req, res) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const userInfo = userdb.logs.find((user) => user.token === token);
  if (userInfo === undefined) {
    return;
  }
  res.status(200).json(userInfo.name);
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "BAD AUTHORIZATION HEADER";
    res.status(status).json({ status, message });
    return;
  } else if (req.headers.authorization === "EXPIRED"){
    res.status(200).json("");
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "ERROR: ACEESS TOKEN IS NOT VAILD";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(9999, () => {
  console.log("API SERVER IS STARTED!");
});

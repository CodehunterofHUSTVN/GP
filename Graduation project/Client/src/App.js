import React, { useState, useEffect} from "react";
import "./App.css";
import Header from "./components/header/Header.js";
import Content from "./components/pages/home/Content.js";
import EInfo from "./components/pages/cakedetail/EInfo.js";
import Cart from "./components/pages/cart/Cart.js";
import Checkout from "./components/pages/checkout/Checkout.js";
import Done from "./components/pages/checkout/Done.js";
import Register from "./components/pages/account/Register.js";
import Success from "./components/pages/account/Success.js";
import Login from "./components/pages/account/Login.js";
import Map from "./components/pages/store/Store.js";
import Footer from "./components/footer/Footer.js";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [ip, setIp] = useState("");

  const getToken = () =>{
    return window.localStorage.getItem("token");
  }

  useEffect(()=>{
    axios.get('https://api.ipify.org?format=json')
    .then((res)=>{setIp(res.data.ip); console.log(ip)})
  },[ip]);

  useEffect(() => {
    axios.get("http://localhost:2109/cake").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:2109/item?ip="+ip).then((res) => {
      if(res.data!==[]){setItems(res.data);}
    });
  }, [isNew,ip]);

  useEffect(() => {
    const encryptedToken = getToken();
    if (encryptedToken !== null) {
      const decryptedToken = CryptoJS.TripleDES
        .decrypt(encryptedToken, "209012")
        .toString(CryptoJS.enc.Utf8);
      setToken(decryptedToken);
      return;
    }
  },[]);

  useEffect(() => {
    axios
        .get("http://localhost:9999/logs", {
          headers: { "Authorization": "Bearer " + token},
        })
        .then((res) => {
          setUser(res.data);
        });
  }, [token]);
  
  const AddItem = (product) => {
    const postProduct = JSON.parse(JSON.stringify(product));
    delete postProduct.id;
    postProduct.ip = ip;
    const ProductExist = items.find((cartItem) => cartItem.pathname === postProduct.pathname);
    if (ProductExist) {
      axios.put("http://localhost:2109/item/" + ProductExist.id, {
        ...postProduct,
        quantity: ProductExist.quantity + 1,
      });
    } else {
      axios.post("http://localhost:2109/item/",{...postProduct, quantity: 1});
    }
    setIsNew(!isNew);
  };

  const RemoveItem = (product) => {
    const postProduct = JSON.parse(JSON.stringify(product));
    delete postProduct.id;
    postProduct.ip = ip;
    const ProductExist = items.find((cartItem) => cartItem.pathname === postProduct.pathname);
    if (ProductExist.quantity === 1) {
      axios.delete(
        "http://localhost:2109/item/" + ProductExist.id,
        items.filter((cartItem) => cartItem.id !== ProductExist.id)
      );
    } else {
      axios.put("http://localhost:2109/item/" + ProductExist.id, {
        ...postProduct,
        quantity: ProductExist.quantity - 1,
      });
    }
    setIsNew(!isNew);
  };

  const ClearAll = () =>{
    items.forEach((item)=>{
        axios.delete("http://localhost:2109/item/" + item.id);
    });
    setIsNew(!isNew);
    return;
  }

  return (
    <Router>
      <div className="app">
        <Header items={items} data={data} user={user}/>
        <Route extract path="/home">
          <Content data={data} AddItem={AddItem} ip={ip}/>
        </Route>
        <Route path="/cakedetail/">
          <EInfo user={user} data={data} AddItem={AddItem} ip={ip}/>
        </Route>
        <Route extract path="/cart">
          <Cart items={items} AddItem={AddItem} RemoveItem={RemoveItem}/>
        </Route>
        <Route extract path="/checkout/detail">
          <Checkout items={items} ClearAll={ClearAll}/>
        </Route>
        <Route extract path="/checkout/success">
          <Done/>
        </Route>
        <Route extract path="/register/form">
          <Register/>
        </Route>
        <Route extract path="/register/success">
          <Success/>
        </Route>
        <Route extract path="/login">
          <Login/>
        </Route>
        <Route extract path="/store">
          <Map/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./einfo.css";

const EInfo = ({ user, data, AddItem }) => {
  let params = new URLSearchParams(document.location.search);
  let name = params.get("cakename");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedbacks, setFeedback] = useState([]);
  const [form, setForm] = useState({
    rating: 0,
    assessment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm({ ...form, rating: rating });
  }, [rating]);

  useEffect(() => {
    axios.get("http://localhost:2109/feedback").then((res) => {
      setFeedback(res.data);
    });
  }, [form]);

  return (
    <div className="bgs">
      {data.map((item) => {
        if (name !== item.pathname) {
          return null;
        }
        return (
          <div className="pas">
            <div className="qws">
              <img src={item.bigimg} alt={item.name} />
              <div className="tpbs">
                <div className="cts">{item.name}</div>
                <div className="pocs">${item.price}</div>
                <Button className="buts" onClick={() => AddItem(item)}>
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div className="dbs">
              <h2 className="dts"> Description </h2>
              <p className="dcs">{item.foreword}</p>
              <h2 className="dts"> Ingredients </h2>
              <p className="dcs">{item.ingredients}</p>
              <h6 className="dcs">
                <span role="img" aria-label="green heavy check mark">
                  &#9989;
                </span>{" "}
                100% products are "100 Percent Organic" allowed under the USDA
                organic regulations{" "}
              </h6>
              <h2 className="dts"> Reservations </h2>
              <p className="dcs">
                {" "}
                Reservations are accepted up to 5 days before the desired date
                of receipt
              </p>
            </div>
            <h2 className="dts"> Feedbacks </h2>
            {feedbacks.length === 0 && (
              <p className="dcs">
                {" "}
                No feedback found. Let be the first one feedback us!
              </p>
            )}
            <div className="fls">
              <div className="flis">
                <p className="flhs"> Feedback list </p>
                {feedbacks.map((feedback) => {
                  if (name !== feedback.cakeId) {
                    return null;
                  }
                  return (
                    <div>
                      <div className="ess">
                        {[...Array(feedback.rating)].map((star, index) => {
                          index += 1;
                          return <span>&#128970;</span>;
                        })}
                      </div>
                      <p className="nffs"> {feedback.username} </p>
                      <p className="dcs"> {feedback.assessment} </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {user === "" && (
              <div>
                <p className="lgtis">
                  {" "}
                  Please&nbsp;
                  <Link to="/login" className="lghlts">
                    login in here
                  </Link>{" "}
                  &nbsp;to feedback us. Thank you for everything!
                </p>
              </div>
            )}
            {user !== "" && (
              <Form>
                <Label className="dcs"> Your rating </Label>
                <div className="srs dcs">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <span
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <span>&#128970;</span>
                      </span>
                    );
                  })}
                </div>
                <FormGroup>
                  <Label className="dcs"> Your assessment</Label>
                  <Input
                    className="fis ftas"
                    type="textarea"
                    name="assessment"
                    onChange={handleChange}
                  />
                </FormGroup>
                <button
                  className="sebs"
                  onClick={(e) => {
                    if (form.rating !== 0 && form.assessment !== "") {
                      e.preventDefault();
                      axios.post(
                        "http://localhost:2109/cake/" +
                          item.pathname +
                          "/feedback",
                        {...form, username: user}
                      );
                      alert("THANK YOU FOR YOUR FEEDBACK!!!");
                    } else {
                      e.preventDefault();
                      alert(
                        "Please give us both rating and assessment! Thank you!"
                      );
                    }
                  }}
                  href="none"
                >
                  {" "}
                  SEND{" "}
                </button>
              </Form>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EInfo;

import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import "./checkout.css";

const Checkout = ({ items,ClearAll }) => {

  const yesterday = new Date(Date.now() - 86400000);
  const total = items.reduce(
    (price, cartItem) => price + cartItem.quantity * cartItem.price,
    0
  );

  const goDone = () => {
    window.location.href = "/checkout/success";
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      address: "",
      phoneNumber: "",
      date: null,
      note: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Your name is too long").required("Required"),
      gender: Yup.string()
        .max(30, "Your gender is too long")
        .required("Required"),
      address: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9-+]+$/, "Error!")
        .required("Required"),
      date: Yup.date()
        .min(yesterday, "Your chosen day is invalid")
        .required("Required"),
      note: Yup.string().notRequired(),
    }),
    onSubmit: (values) => {
      const info = [];
      items.forEach((o) => {
        let subInfo = {
          cake_name: o.menuname,
          quantity: o.quantity,
        };
        info.unshift(subInfo);
      });
      const bill = {
        name: values.name,
        gender: values.gender,
        address: values.address,
        phone: values.phone,
        date: values.date,
        product: info,
        total: "$" + total,
        note: values.note,
      };
      axios.post("http://localhost:2109/bill", bill).then((res)=>{
        ClearAll();
        goDone();
      });
    },
  });

  return (
    <div className="cops">
      <div className="cols">
        <p className="colhs"> YOUR BILL </p>

        <div div className="cols">
          {items.map((cartItem) => (
            <div key={cartItem.id} className="coals">
              <div className="coliins">
                <img
                  className="coliis"
                  width="100"
                  height="100"
                  src={cartItem.img}
                  alt={cartItem.name}
                />

                <div className="colins">{cartItem.name}</div>
              </div>

              <table className="colilss">
                <tr>
                  <td className="clis">x{cartItem.quantity}</td>
                  <td>${cartItem.quantity * cartItem.price}</td>
                </tr>
              </table>
            </div>
          ))}
        </div>

        <div className="coltps">
          <div> TOTAL </div>
          <div> ${total} </div>
        </div>
      </div>

      <div>
        <form onSubmit={formik.handleSubmit} className="colfs">
          <label htmlFor="name">YOUR NAME</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="colwts">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="gender">GENDER</label>
          <input
            id="gender"
            name="gender"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          />
          {formik.touched.gender && formik.errors.gender ? (
            <div className="colwts">{formik.errors.gender}</div>
          ) : null}

          <label htmlFor="address">ADDRESS</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="colwts">{formik.errors.address}</div>
          ) : null}

          <label htmlFor="phoneNumber">TELEPHONE NUMBER</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="colwts">{formik.errors.phoneNumber}</div>
          ) : null}

          <label htmlFor="date">EXPECTED DATE</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="colwts">{formik.errors.date}</div>
          ) : null}

          <label htmlFor="note">MORE DETAIL</label>
          <textarea
            id="note"
            name="note"
            type="textarea"
            className="colmds"
            placeholder="Let tell us more about your requirement!"
            rows="5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
          />
          {formik.touched.note && formik.errors.note ? (
            <div className="colwts">{formik.errors.date}</div>
          ) : null}

          <div className="coldts">
            {" "}
            By clicking SEND, you agree to our &nbsp;
            <Link href="/terms">Payment policy</Link> &nbsp;
          </div>
          <button type="submit" className="colsbs">
            {" "}
            SEND{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

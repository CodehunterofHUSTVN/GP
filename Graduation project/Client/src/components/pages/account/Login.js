import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import axios from "axios";

import "./login.css";

const Login = () => {

  const [eToken, setEToken] = useState();

  const goSignup = () => {
    window.location.href = "/register/form";
  };

  const goHome = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    window.localStorage.setItem("token",eToken);
  }, [eToken]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, "Username can only contain letters and numbers")
        .min(5, "Your username is too short")
        .max(15, "Your username is too long"),
      password: Yup.string()
        .min(8, "Your password is too short")
        .max(15, "Your password is too long")
    }),
    onSubmit: values => {
      
      const postData = {
        name: values.userName,
        password: sha256(values.password).toString(),
      }

      axios.post("http://localhost:9999/auth/login",postData)
      .then((res)=>{
        if(res.data.message==="WELCOME"){
          const encryptedToken = CryptoJS.TripleDES.encrypt(res.data.token,"209012").toString();
          const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
          const postLog = {
            name: values.userName,
            token: res.data.token,
            timein: timestamp
          }
          axios.post("http://localhost:9999/logs",postLog);
          setEToken(encryptedToken);
          goHome();
        }else{
          alert("INCORRECT USERNAME OR PASSWORD!!!");
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="lgfs">
        <p1 className="lgts"> WELCOME TO OUR PAGE!!! </p1>
        <label htmlFor="userName">USERNAME</label>
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div className="lgwts">{formik.errors.userName}</div>
        ) : null}

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="lgwts">{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="lgsbs"
        >
          {" "} LOG IN {" "}
        </button>

        <Link href="/" className="lgfpbs">Forgotten password?</Link>

        <hr className="hrts"/>

        <button type="button"  onClick={()=>goSignup()} className="lgsubs">
          {" "} CREATE YOUR OWN ACCOUNT {" "}
        </button>
      </form>
    </div>
  );
};

export default Login;

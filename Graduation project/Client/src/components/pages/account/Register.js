import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import * as Yup from "yup";

import "./register.css";

const Register = () => {

  const handleRedirect = () => {
    window.location.href = "/register/success";
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, "Username can only contain letters and numbers")
        .matches(/^(?!admin).*$/, "Username is invaild! Please try again!!!")
        .min(5, "Your username is too short")
        .max(15, "Your username is too long")
        .required("Required"),
      password: Yup.string()
        .min(8, "Your password is too short")
        .max(15, "Your password is too long")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password must match")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: values => {
      const postData = {
        name: values.userName,
        password: sha256(values.password).toString(),
        email:values.email
      }

      axios.post("http://localhost:9999/check",postData)
      .then((res)=>{
        if(res.data==="OK! IT'S FINE"){
          axios.post("http://localhost:9999/users",postData);
          handleRedirect();
        }else{
          alert("THIS USERNAME OR EMAIL HAVE BEEN USED!PLEASE CHOOSE ANOTHER ONE!!!");
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="rgfs">
        <p1 className="rts"> BECOME CAKIES MEMBER </p1>
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
          <div className="rwts">{formik.errors.userName}</div>
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
          <div className="rwts">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="password">CONFIRM PASSWORD</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="rwts">{formik.errors.confirmPassword}</div>
        ) : null}

        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="rwts">{formik.errors.email}</div>
        ) : null}
        <div className="rdts">
          {" "}
          By clicking JOIN US, you agree to our &nbsp;
          <Link href="/terms">Terms</Link>, &nbsp;
          <Link href="/poilcy/data">Data Policy</Link>, &nbsp;
          <Link href="/poilcy/cookie">Cookie Policy</Link>.
        </div>
        <button
          type="submit"
          className="rsbs"
        >
          {" "}
          JOIN US{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;

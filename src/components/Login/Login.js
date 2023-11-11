import React, { useEffect, useReducer, useState } from "react";
import style from "./Login.module.css";
import Button from "../UI-Store/Button/Button";
import Input from "../UI-Store/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../Redux-store";

const emailReduser = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};
const passwordReduser = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ForgotPassword, setForgotPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReduser, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    setFormIsValid(
      emailState.isValid && (passwordState.isValid || ForgotPassword)
    );
  }, [emailState.isValid, passwordState.isValid, ForgotPassword]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "INPUT", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "INPUT", val: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let url = `https://expense-tracker-app-backend.vercel.app/login`;
    let obj = {
      email: emailState.value,
      password: passwordState.value,
    };
    if (ForgotPassword) {
      url = `https://expense-tracker-app-backend.vercel.app/forgotpassword`;
      obj = { email: emailState.value };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const result = await res.json();
      if (result.login) {
        dispatch(AuthAction.setUserVerified({ token: result.token }));
        alert(result.message);
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.login}>
      <h3>{ForgotPassword ? "Send Forgot Password link" : 'Login'}</h3>
      <form onSubmit={HandleSubmit}>
        <Input
          id="Email"
          type="text"
          isValid={emailState.isValid}
          onChange={HandleEmail}
          value={emailState.value}
        />
        {!ForgotPassword && (
          <Input
            id="Password"
            type="password"
            isValid={passwordState.isValid}
            onChange={HandlePassword}
            value={passwordState.value}
          />
        )}

        <div className={style.actions}>
          <Button type="submit" disabled={!formIsValid}>
            {!ForgotPassword ? "Login" : "Forgot Password"}
          </Button>
        </div>
      </form>
        <Link to="/signup">Sign Up</Link>
        <button className={style.btn}
          onClick={() =>
            setForgotPassword(!ForgotPassword)
          }
        >
          {ForgotPassword ? "Login" : "Forgot Password"}
        </button>
    </div>
  );
}

export default Login;

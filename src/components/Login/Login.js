import React, { useEffect, useReducer, useState } from "react";
//import Card from "../UI/Card/Card";
import style from "./Login.module.css";
import Button from "../UI-Store/Button/Button";
import Input from "../UI-Store/Input/Input";

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
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};

function Login(props) {
  const [Name, setName] = useState("");
  const [SignUp, setSignUp] = useState(false);
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
        emailState.isValid && passwordState.isValid && Name.trim().length > 1
      )
  }, [emailState.isValid, passwordState.isValid, Name]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "INPUT", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "INPUT", val: e.target.value });
  };
  const HandleName = (e) => {
    setName(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
   console.log(emailState.value, passwordState.value);
  };

  const HandleToggle=()=>{
   setSignUp((prevSignUp)=> !prevSignUp);
   console.log('cccccc');
  }

  return (
    <div className={style.login}>
      <form onSubmit={HandleSubmit}>
          <Input
            id="Name"
            type="text"
            state={Name}
            onChange={HandleName}
            value={Name}
          />
        <Input
          id="Email"
          type="text"
          isValid={emailState.isValid}
          onChange={HandleEmail}
          value={emailState.value}
        />
        <Input
          id="Password"
          type="password"
          isValid={passwordState.isValid}
          onChange={HandlePassword}
          value={passwordState.value}
        />

        <div className={style.actions}>
          <Button type="submit" disabled={!formIsValid}>
            {SignUp ? "Sign Up" : "Login"}
          </Button>
        </div>
          <button type="button" onClick={HandleToggle} >{!SignUp ? "Sign Up" : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;

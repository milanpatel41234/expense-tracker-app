import React, { useEffect, useReducer, useState} from "react";
import style from "./SignUp.module.css";
import Button from "../UI-Store/Button/Button";
import Input from "../UI-Store/Input/Input";
import { Link , useNavigate} from "react-router-dom";

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

function SignUp(props) {
    const navigate = useNavigate();
  const [Name, setName] = useState("");
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

  const HandleSubmit = async(e) => {
    e.preventDefault();
    const newuser={
        name:Name,
        email:emailState.value,
        password:passwordState.value
    }
   try {
    const res = await fetch(`http://localhost:5000/signup`,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newuser)
    });
  const result = await res.json();
    if(!result.error){
        alert('account created successfully');
        navigate('/login');
    }else throw new Error(result.message);
   } catch (error) {
   alert(error.message);
   }
  };

  return (
    <div className={style.SignUp}>
        <h3>Create new account</h3>
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
           Sign Up
          </Button>
        </div>
         <Link to='/login'>Login</Link>
      </form>
    </div>
  );
}

export default SignUp;

import React, { useEffect, useReducer, useState} from "react";
import style from "./SignUp.module.css";
import Button from "../UI-Store/Button/Button";
import Input from "../UI-Store/Input/Input";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { AlertAction } from "../Redux-store";

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
    const dispatch = useDispatch()
  const [Name, setName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [signUpBtn , setSignUpBtn] = useState('Create Account');

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
    setSignUpBtn('Creating...');
    const newuser={
        name:Name,
        email:emailState.value,
        password:passwordState.value
    }
   try {
    const res = await fetch(`https://expense-tracker-app-backend.vercel.app/signup`,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newuser)
    });
  const result = await res.json();
  setSignUpBtn('Create');
    if(!result.error){
      dispatch(AlertAction.ShowAlert(result.message));
        navigate('/login');
    }else throw new Error(result.message);
   } catch (error) {
    dispatch(AlertAction.ShowAlert(error.message));
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
           {signUpBtn}
          </Button>
        </div>
         <Link to='/login'>Login</Link>
      </form>
    </div>
  );
}

export default SignUp;

import React from "react";
import style from "./Input.module.css";

function Input(props) {
  return (
    <div
      className={`${style.control} ${
        props.isValid === false ? style.invalid : ""
      }`}
    >
      <input
        placeholder={props.id}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        type={props.type}
      />
    </div>
  );
}

export default Input;

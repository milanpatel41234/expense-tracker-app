import React from "react";
import Style from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AlertAction } from "../../Redux-store";

function Modal() {
  const Alert = useSelector(state=>state.Alert);
  const dispatch = useDispatch();
  return <div className={Style.overlay}>
      <div className={Style.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{Alert.Message}</h3>
        <button className={Style.closeButton} onClick={()=>dispatch(AlertAction.DismissAlert())}>
          ok
        </button>
      </div>
    </div>
}

export default Modal;

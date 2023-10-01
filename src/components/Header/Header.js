import React, { useEffect } from "react";
//import Razorpay from "razorpay";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../Redux-store";
import { varifyPremium } from "../Redux-store/AuthPremium";

function Header() {
  const Auth = useSelector((state) => state.Auth);
  const AuthPremium = useSelector((state) => state.AuthPremium);
  console.log(AuthPremium.isPremiumUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(varifyPremium());
  }, [dispatch]);

  const HandleLogout = () => {
    dispatch(AuthAction.setlogout());
  };
  const PurchasePremium = async (e) => {
    try {
      const res = await fetch("http://localhost:5000/purchasepremium", {
        headers: { token: Auth.token },
      });
      const response = await res.json();
      if (res.error) throw new Error(res.error);
      let options = {
        key: response.key_id,
        order_id: response.order.id,
        handler: async function (result) {
          await fetch("http://localhost:5000/purchasepremium/updatestatus", {
            method: "POST",
            headers: { "Content-Type": "application/json", token: Auth.token },
            body: JSON.stringify({
              order_id: options.order_id,
              payment_id: result.razorpay_payment_id,
            }),
          });
          alert("you are now premium user");
        },
      };
      const RZP1 = new window.Razorpay(options);
      RZP1.open();
      e.preventDefault();
      RZP1.on("payment.failed", (response) => {
        console.log(response);
        alert("Something went wrong");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.header}>
      {AuthPremium.isPremiumUser ? (
        <span>Premium User</span>
      ) : (
        <button onClick={PurchasePremium}>Buy Premium</button>
      )}
      <h2>My Expenses</h2>
      <button onClick={HandleLogout}>Logout</button>
    </div>
  );
}

export default Header;

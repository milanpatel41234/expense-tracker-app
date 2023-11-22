import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../Redux-store";
import { varifyPremium } from "../Redux-store/AuthPremium";
import { Link , useNavigate} from "react-router-dom/dist";

function Header() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.Auth);
  const AuthPremium = useSelector((state) => state.AuthPremium);
  const [btnClass , setBtnClass] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Auth.loginState) {
      dispatch(varifyPremium());
    }
  }, [dispatch, Auth.loginState]);

  const HandleLogout = () => {
    dispatch(AuthAction.setlogout());
    navigate('/login');
  };
  const PurchasePremium = async (e) => {
    try {
      const res = await fetch("https://expense-tracker-app-backend.vercel.app/purchasepremium", {
        headers: { token: Auth.token },
      });
      const response = await res.json();
      if (res.error) throw new Error(res.error);
      let options = {
        key: response.key_id,
        order_id: response.order.id,
        handler: async function (result) {
          await fetch("https://expense-tracker-app-backend.vercel.app/purchasepremium/updatestatus", {
            method: "POST",
            headers: { "Content-Type": "application/json", token: Auth.token },
            body: JSON.stringify({
              status: "success",
              order_id: options.order_id,
              payment_id: result.razorpay_payment_id,
            }),
          });
          dispatch(varifyPremium());
          alert("you are now premium user");
        },
      };
      const RZP1 = new window.Razorpay(options);
      RZP1.open();
      e.preventDefault();
      RZP1.on("payment.failed", async (result) => {
        await fetch("https://expense-tracker-app-backend.vercel.app/purchasepremium/updatestatus", {
          method: "POST",
          headers: { "Content-Type": "application/json", token: Auth.token },
          body: JSON.stringify({
            status: "failed",
            order_id: options.order_id,
            payment_id: result.error.metadata.payment_id,
          }),
        });
        alert("Something went wrong");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.header}>
      <div>
      <h2 >Expense Tracker</h2>
      </div>
      <div className={style.nav}>
        {Auth.loginState &&
          (AuthPremium.isPremiumUser ? (
            <div>
              <span className={`${style.premium} ${style[btnClass]}`}>Premium User</span>
              <Link className={`${style.btn} ${style[btnClass]}`} to="/leaderboard">
                LeaderBoard
              </Link>
            </div>
          ) : (
            <button  className={`${style.premium} ${style[btnClass]}`} onClick={PurchasePremium}>
              Buy Premium
            </button>
          ))}
        {Auth.loginState ? (
          <div>
            <Link className={`${style.btn} ${style[btnClass]}`} to="/">
              Expenses
            </Link>
            <button className={`${style.btn} ${style[btnClass]}`} onClick={HandleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className={`${style.btn} ${style[btnClass]}`} to="/login">
            Login
          </Link>
        )}
      </div>
        <div onClick={(e)=>{!btnClass ? setBtnClass('active') : setBtnClass(null)}} className={style.manubtn}>
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  );
}

export default Header;

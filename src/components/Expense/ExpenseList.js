import React from "react";
import style from "./Expense.module.css";
import { useEffect } from "react";
import {useSelector,useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";

function ExpenseList() {
  const Auth = useSelector(state=>state.Auth);
  const Expense = useSelector((state) => state.Expense);
  const dispatch = useDispatch();
  let ListItem = 'No Items';

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expense/${id}`, {
      method: "DELETE",
      headers:{"Content-Type": "application/json",
       "token":Auth.token}
    });
    if(res.ok) dispatch(getExpense())
    else throw new Error(res.error)
    } catch (error) {
      console.log(error)
    }
   
  };


  if(Expense.ExpenseArray && Expense.ExpenseArray.length>0){
   ListItem = Expense.ExpenseArray.map((exp) => {
    return (
      <li key={exp.id} className={style.list}>
        <div className={style.listdi}>
          <h3>{exp.amount}</h3>
          <p>Category: {exp.category}</p>
        </div>
        <div className={style.listdiv}>
          <p>{exp.date}</p>
          <p>{exp.details}</p>
          <button
            onClick={HandleDelete.bind(null, exp.id)}
            variant="danger"
          >
            Delete
          </button>
        </div>
      </li>
    );
  });
  }
  return <div className={style.container}>{ListItem}</div>;
}

export default ExpenseList;

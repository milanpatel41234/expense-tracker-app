import React from "react";
import style from "./Expense.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";
import { useSelector } from "react-redux";

function ExpenseList(props) {
  const Expense = useSelector((state) => state.Expense);
  const dispatch = useDispatch();
  let ListItem = 'No Items';

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expense/${id}`, {
      method: "DELETE",
    });
    if(res.ok) dispatch(getExpense())
    else throw new Error(res.error)
    } catch (error) {
      console.log(error)
    }
   
  };

  const HandleEdit = (item) => {};

  if(Expense.ExpenseArray && Expense.ExpenseArray.length>0){
   ListItem = Expense.ExpenseArray.map((exp) => {
    return (
      <li key={exp.id} className={style.list}>
        <div className={style.listdiv}>
          <h3>{exp.amount}</h3>
          <p>Date: {exp.date}</p>
          <p>Category: {exp.category}</p>
        </div>
        <div className={style.listdiv}>
          <p>Details: {exp.details}</p>
          <button onClick={HandleEdit.bind(null, exp)} variant="danger">
            Edit
          </button>
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
  return <div>{ListItem}</div>;
}

export default ExpenseList;

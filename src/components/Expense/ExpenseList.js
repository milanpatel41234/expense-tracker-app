import React, { useState } from "react";
import style from "./Expense.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";

function ExpenseList() {
  const Auth = useSelector((state) => state.Auth);
  const Expense = useSelector((state) => state.Expense);
  const dispatch = useDispatch();
  let ListItem = "No Items";
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PageLimit, setPageLimit] = useState(
    localStorage.PageLimit ? localStorage.getItem("PageLimit") : 5
  );

  useEffect(() => {
    dispatch(getExpense({ CurrentPage, PageLimit }));
  }, [dispatch, CurrentPage, PageLimit]);

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expense/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: Auth.token },
      });
      if (res.ok) dispatch(getExpense({ CurrentPage, PageLimit }));
      else throw new Error(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  
  const HandlePageLimit = (e) => {
    setPageLimit(e.target.value);
    localStorage.setItem("PageLimit", e.target.value);
    setCurrentPage(1);
  };

  if (Expense.ExpenseArray && Expense.ExpenseArray.length > 0) {
    ListItem = Expense.ExpenseArray.map((exp) => {
      return (
        <li key={exp._id} className={style.list}>
          <div className={style.listdi}>
            <h3>{exp.amount}</h3>
            <p>Category: {exp.category}</p>
          </div>
          <div className={style.listdiv}>
            <p>{exp.date}</p>
            <p>{exp.details}</p>
            <button onClick={HandleDelete.bind(null, exp._id)} variant="danger">
              Delete
            </button>
          </div>
        </li>
      );
    });
  }
  return (
    <div className={style.container}>
      <div className={style.contdiv}>
        <b>Total : {Expense.total}</b>
      </div>

      {ListItem}
      <div className={style.contdiv}>
        <div>
          {Expense.prev_page && (
            <button
              onClick={() => setCurrentPage(CurrentPage - 1)}
              className={style.btn}
            >
              ...prev
            </button>
          )}
        </div>
        <div>
          <label htmlFor="pagelimit">Items per Page : </label>
          <select id="pagelimit" onChange={HandlePageLimit} value={PageLimit}>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div>
          {Expense.next_page && (
            <button
              onClick={() => setCurrentPage(CurrentPage + 1)}
              className={style.btn}
            >
              Next...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;

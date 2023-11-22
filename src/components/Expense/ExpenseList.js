import React, { useState } from "react";
import style from "./Expense.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";
import LoadingSkeleton from "../UI-Store/Skeleton/Skeleton";

function ExpenseList() {
  const Auth = useSelector((state) => state.Auth);
  const Expense = useSelector((state) => state.Expense);
  const dispatch = useDispatch();
  let ListItem = <h3>No Expense available</h3>;
  const [loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PageLimit, setPageLimit] = useState(
    localStorage.PageLimit ? localStorage.getItem("PageLimit") : 5
  );

  useEffect(() => {
    (async()=>{
     await dispatch(getExpense({ CurrentPage, PageLimit }));
      setLoading(false);
    })()
  }, [dispatch, CurrentPage, PageLimit]);

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`https://expense-tracker-app-backend.vercel.app/expense/${id}`, {
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

  if (Expense.ExpenseArray.length > 0) {
    ListItem = Expense.ExpenseArray.map((exp) => {
      return (
        <li key={exp._id} className={style.list}>
          <div className={style.listdi}>
            <h3>Rs. {exp.amount}</h3>
            <p>{exp.category}</p>
            <p>{exp.date}</p>
          </div>
          <div className={style.listdiv}>
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
     {loading ? <>
     <LoadingSkeleton/>
     <LoadingSkeleton/>
     <LoadingSkeleton/>
     <LoadingSkeleton/>
     <LoadingSkeleton/>
     <LoadingSkeleton/>
     </>
      : ListItem}
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
        {Expense.ExpenseArray.length > 0 && <div>
          <label htmlFor="pagelimit">Items per Page : </label>
          <select id="pagelimit" onChange={HandlePageLimit} value={PageLimit}>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>}
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

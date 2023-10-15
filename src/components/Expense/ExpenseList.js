import React, { useState } from "react";
import style from "./Expense.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";

function ExpenseList() {
  const Auth = useSelector((state) => state.Auth);
  const AuthPremium = useSelector((state) => state.AuthPremium);
  const Expense = useSelector((state) => state.Expense);
  const dispatch = useDispatch();
  let ListItem = "No Items";
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PageLimit, setPageLimit] = useState(
    localStorage.PageLimit ? localStorage.getItem("PageLimit") : 5
  );
  const [DownloadBtn, setDownloadBtn] = useState("Download");
  const [LinkBtn, setLinkBtn] = useState(false);

  useEffect(() => {
    dispatch(getExpense({ CurrentPage, PageLimit }));
  }, [dispatch, CurrentPage, PageLimit]);

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/expense/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: Auth.token },
      });
      if (res.ok) dispatch(getExpense());
      else throw new Error(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  const DownloadExpense = async () => {
    setDownloadBtn("Genrating...");
    try {
      const res = await fetch(`http://localhost:5000/downloadexpense`, {
        headers: { "Content-Type": "application/json", token: Auth.token },
      });

      if (res.ok) {
        const data = await res.json();
        setDownloadBtn('Download');
        console.log(data.fileURL)
        setLinkBtn(data.fileURL);
      } else throw new Error(res.error);
    } catch (error) {
      setDownloadBtn("Failed");
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
        <li key={exp.id} className={style.list}>
          <div className={style.listdi}>
            <h3>{exp.amount}</h3>
            <p>Category: {exp.category}</p>
          </div>
          <div className={style.listdiv}>
            <p>{exp.date}</p>
            <p>{exp.details}</p>
            <button onClick={HandleDelete.bind(null, exp.id)} variant="danger">
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
        <div>
          {AuthPremium.isPremiumUser && (
           LinkBtn ? <div >
                Link Generated : 
                <a onClick={()=>setLinkBtn(false)} href={LinkBtn} target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </div> : <button onClick={DownloadExpense} className={style.btn}>
                {DownloadBtn}
              </button>
             
              
             )}
        </div>
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

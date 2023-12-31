import React, { useState } from "react";
import style from "./Expense.module.css";
import Input from "../UI-Store/Input/Input";
import Button from "../UI-Store/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getExpense } from "../Redux-store/expenses";

function ExpenseForm() {
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch()
  const [Amount, setAmount] = useState("");
  const [Date, setDate] = useState("");
  const [Details, setDetails] = useState("");
  const [Category, setCategory] = useState("NO");
  const [addExpense , setAddExpense] = useState('Add Expense')

  const HandleExpenseTitle = (e) => {
    setAmount(e.target.value);
  };
  const HandleDate = (e) => {
    setDate(e.target.value);
  };
  const HandleDetails = (e) => {
    setDetails(e.target.value);
  };
  const HandleCategory = (e) => {
    setCategory(e.target.value);
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    if (
      Amount.trim() !== "" &&
      Date.trim() !== "" &&
      Details.trim() !== "" &&
      Category !== "NO"
    ) {
      setAddExpense('Adding...');
      try {
        const Expense = {
          amount: Amount,
          date: Date,
          category: Category,
          details: Details,
        };
      const res = await fetch(`https://expense-tracker-app-backend.vercel.app/expense?page=1`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token":Auth.token
          },
          body: JSON.stringify(Expense),
        });
        if(!res.ok) throw new Error()
        else{
      setAmount('');
      setCategory('NO');
      setDate('');
      setDetails('');
      dispatch(getExpense({ CurrentPage:1, PageLimit:localStorage.getItem("PageLimit")||5}))
      setAddExpense('Add Expense')
    }
      } catch (error) {
        console.log("errrr", error);
      }
    }else{alert("Please enter valid details")}
  }

  return (
    <div className={style.container}>
      <form onSubmit={HandleSubmit}>
        <div className={style.inDiv}>
          <Input id="Date" type="date" onChange={HandleDate} value={Date} />
          <select onChange={HandleCategory} value={Category}>
            <option value="NO">Select Category</option>
            <option value="Investment">Investment</option>
            <option value="Fun">Fun</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <Input
          id="Amount"
          type="number"
          onChange={HandleExpenseTitle}
          value={Amount}
        />
        <Input
          id="Expense-Details"
          type="text"
          onChange={HandleDetails}
          value={Details}
        />
        <Button type="submit">{addExpense}</Button>
      </form>
    </div>
  );
}

export default ExpenseForm;

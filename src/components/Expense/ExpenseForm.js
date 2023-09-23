import React, { useState } from "react";
import style from "./Expense.module.css";
import Input from "../UI-Store/Input/Input";
import Button from "../UI-Store/Button/Button";
import { useDispatch } from "react-redux";
import { getExpense } from "../Redux-store/expenses";

function ExpenseForm() {
  const dispatch = useDispatch()
  const [Amount, setAmount] = useState("");
  const [Date, setDate] = useState("");
  const [Details, setDetails] = useState("");
  const [Category, setCategory] = useState("NO");

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
      try {
        const Expense = {
          amount: Amount,
          date: Date,
          category: Category,
          details: Details,
        };
      const res = await fetch(`http://localhost:5000/expense`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Expense),
        });
      if(!res.ok) throw new Error()
      else{dispatch(getExpense())}
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
            <option value="NO">Select Expense category</option>
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
        <Button type="submit">Add Expense</Button>
      </form>
    </div>
  );
}

export default ExpenseForm;

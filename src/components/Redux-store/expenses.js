import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getExpense = createAsyncThunk(
  "Expense/getData",
  async (arg, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");

      const response = await fetch(`http://localhost:5000/expense?page=${arg}`, {
        headers: { "Content-Type": "application/json", token: token },
      });
      if (!response.ok) {
        throw new Error("Unable to fetch Expenses! Something went wronge.");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState: { ExpenseArray: [], total: 0 , currentpage:1, next_page:false, prev_page:false},
  reducers: {},
  extraReducers: {
    [getExpense.fulfilled]: (state, { payload }) => {
      state.ExpenseArray = payload.expense;
      state.total = payload.total;
      state.currentpage = payload.currentpage;
      state.next_page = payload.next_page;
      state.prev_page = payload.prev_page;
    },
  },
});

export default ExpenseSlice;

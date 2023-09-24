import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getExpense = createAsyncThunk('Expense/getData', async(arg,{
    rejectWithValue
})=>{
try {
  const token = localStorage.getItem('Token');
  console.log('tttttasnc',token)
    const response = await fetch(`http://localhost:5000/expense`,{
      headers:{"Content-Type":"application/json", "token":token}
    });
    console.log(response,'rsppppp')
      if (!response.ok) {
        throw new Error("Unable to fetch Expenses! Something went wronge.");
      } else {
        const data = await response.json();
        return data
      }
} catch (error) {
    rejectWithValue(error);
}
})

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState: { ExpenseArray: []},
  reducers: {  },
    extraReducers:{
     [getExpense.fulfilled] : (state ,{payload})=>{
      state.ExpenseArray =  payload;
     }
  },
});

export default ExpenseSlice;

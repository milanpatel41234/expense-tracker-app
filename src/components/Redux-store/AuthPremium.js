import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const varifyPremium = createAsyncThunk('Authentication/premium', async(arg,{
    rejectWithValue
})=>{
try {
  const token = localStorage.getItem('Token');
  
    const response = await fetch(`http://localhost:5000/varifypremium`,{
      headers:{"Content-Type":"application/json", "token":token}
    });

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

const AuthPremiumSlice = createSlice({
  name: "AuthPremium",
  initialState: { isPremiumUser: false},
  reducers: {  },
    extraReducers:{
     [varifyPremium.fulfilled] : (state ,{payload})=>{
      state.isPremiumUser =  payload.isPremiumUser;
     }
  },
});

export default AuthPremiumSlice;

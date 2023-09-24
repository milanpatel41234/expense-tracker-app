import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth";
import ExpenseSlice from "./expenses";

const store = configureStore({
    reducer : { Expense :ExpenseSlice.reducer , Auth: AuthSlice.reducer}
})
export const AuthAction = AuthSlice.actions;
export const ExpenseAction = ExpenseSlice.actions;
export default store;
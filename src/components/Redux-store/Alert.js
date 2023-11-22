import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
  name: "Alert",
  initialState: {
    Message: null,
    Active: false,
  },
  reducers: {
    ShowAlert(state, action) {
      state.Message = action.payload;
      state.Active = true;
    },
    DismissAlert(state, action) {
      state.Message = null;
      state.Active = false;
    },
  },
});
export default AlertSlice;

import { createSlice } from "@reduxjs/toolkit";


let Token = '' ;
let userLogin = false;
//let username = null;
if(localStorage.Token){
    Token = localStorage.getItem('Token');
    userLogin = true;
   // username = localStorage.UserName;
}

const initialState = {
    token: Token,
   // userName: username,
    loginState: userLogin,
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers:{
     setUserVerified (state,action){
        state.token = action.payload.token;
        //state.userName = cleanedEmail ;
        localStorage.setItem('Token', action.payload.token);
        //localStorage.setItem('UserName', cleanedEmail);
        state.loginState = true;
     },
     setlogout (state){
        state.token = null;
       // state.userName = null;
        state.loginState = false;
        localStorage.removeItem('Token');
       // localStorage.removeItem('UserName');
     }
    }
})

export default AuthSlice;
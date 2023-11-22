import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ExpensePage from "./components/Expense/ExpensePage";
import Header from "./components/Header/Header";

import React, { Suspense } from "react";
import Modal from "./components/UI-Store/AlertModal/Modal";

function App() {
  const Alert = useSelector(state=>state.Alert)
  const LeaderBoard = React.lazy(() =>
    import("./components/LeaderBoard/LeaderBoard")
  );
  const Auth = useSelector((state) => state.Auth);
  const AuthPremium = useSelector((state) => state.AuthPremium);

  return (
    <div className="App">
   {Alert.Active && <Modal />}
        <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              Auth.loginState ? <ExpensePage /> : <Navigate to="/login" />
            }
          />
          <Route path="login" element={ Auth.loginState ? <Navigate to="/" /> : <Login />} />
          <Route path="signup" element={ Auth.loginState ? <Navigate to="/" /> : <SignUp />} />
          <Route
            path="leaderboard"
            element={ Auth.loginState && AuthPremium.isPremiumUser && <LeaderBoard />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

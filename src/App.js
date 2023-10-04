import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ExpensePage from "./components/Expense/ExpensePage";
import Header from "./components/Header/Header";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

function App() {
  const Auth = useSelector((state) => state.Auth);

  return (
    <div className="App">
      <header className="App-header">
        <Header/></header>
      <Routes>
        <Route
          path="/"
          element={Auth.loginState ? <ExpensePage /> :<Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="leaderboard" element={<LeaderBoard/>} />
      </Routes>
    </div>
  );
}

export default App;

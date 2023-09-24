import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ExpensePage from "./components/Expense/ExpensePage";

function App() {
  const Auth = useSelector((state) => state.Auth);
  console.log(Auth)
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route
          path="/"
          element={Auth.loginState ? <ExpensePage /> :<Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

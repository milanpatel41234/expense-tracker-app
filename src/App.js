
import './App.css';
import {Routes, Route } from "react-router-dom";

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      </header>
     <Routes>
     <Route path="login" element={ <Login />} />
     <Route path="signup" element={ <SignUp /> } />
     </Routes>

     
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import style from './Leaderboard.module.css'
import { useSelector } from "react-redux";

function LeaderBoard() {
  const Auth = useSelector((state) => state.Auth);
  const [List, setList] = useState([]);
  let leaderboard ='No Items';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:5000/leaderboard`, {
          headers: { "Content-Type": "application/json", "token": Auth.token },
        });
        if(response.ok){
            const data = await response.json();
            setList(data)
        }else throw new Error(response.error)
      } catch (error) {
       console.log(error)
      }
    })();
  },[Auth.token]);

if(List.length>0){
    leaderboard = List.map((i)=>{
        return <li className={style.list} key={i.userEmail}><div><h3>{i.user.name}</h3><p>{i.total}</p></div></li>
    })
}

  return (
    <div className={style.container}>
      <ol>{leaderboard}</ol>
    </div>
  );
}

export default LeaderBoard;

import React, { useEffect, useState } from "react";
import style from './Leaderboard.module.css'
import { useSelector } from "react-redux";

function LeaderBoard() {
  const Auth = useSelector((state) => state.Auth);
  const [List, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:5000/leaderboard`, {
          headers: { "Content-Type": "application/json", "token": Auth.token },
        });
        if(response.ok){
            const data = await response.json();
            setList(data.map((i)=>{
                return <li key={i._id}><div className={style.list}><h3>{i.name}</h3><p>{i.total}</p></div></li>
            }))
        }else throw new Error(response.error)
      } catch (error) {
       console.log(error)
      }
    })();
  },[Auth.token]);

  return (
    <div className={style.container}>
      <ol>{List}</ol>
    </div>
  );
}

export default LeaderBoard;

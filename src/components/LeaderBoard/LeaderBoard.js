import React, { useEffect, useState } from "react";
import style from './Leaderboard.module.css'
import { useSelector } from "react-redux";
import LoadingSkeleton from "../UI-Store/Skeleton/Skeleton";

function LeaderBoard() {
  const Auth = useSelector((state) => state.Auth);
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://expense-tracker-app-backend.vercel.app/leaderboard`, {
          headers: { "Content-Type": "application/json", "token": Auth.token },
        });
        setLoading(false);
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
      <h3>LeaderBoard</h3>
      <ol>
        { loading ? <>
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
         <LoadingSkeleton />
        </> : List}
        </ol>
    </div>
  );
}

export default LeaderBoard;

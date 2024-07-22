"use client";

import { useEffect, useState } from "react";
import classes from "./cooltime.module.css";
export default function Cooltime({ postCooltime }: { postCooltime: number | undefined }) {
  const [cooltimeState, setCooltimeState] = useState("");
  if (!postCooltime) return <button type="submit">홍보하기</button>;
  useEffect(() => {
    const getCooltime = () => {
      const currentTime = Date.now();
      const total = Math.floor((postCooltime - currentTime) / 1000);
      if (total < 0) {
        setCooltimeState("홍보하기");
        return;
      }
      const minutes = Math.floor(total / 60);
      const seconds = total % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      setCooltimeState(`${formattedMinutes}:${formattedSeconds}`);
    };
    getCooltime();
    const intervalId = setInterval(getCooltime, 1000);
    return () => clearInterval(intervalId);
  }, [postCooltime]);

  if (cooltimeState === "홍보하기") {
    return (
      <button type="submit">
        <p>홍보하기</p>
      </button>
    );
  } else {
    return (
      <button type="submit" disabled className={classes.disableBtn}>
        {cooltimeState}
      </button>
    );
  }
}

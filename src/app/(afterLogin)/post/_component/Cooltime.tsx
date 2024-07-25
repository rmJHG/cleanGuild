import { useEffect, useState, useRef } from "react";
import classes from "./cooltime.module.css";

export default function Cooltime({ postCooltime }: { postCooltime: number }) {
  const [cooltimeState, setCooltimeState] = useState("");
  const remainingTime = useRef(Math.floor((postCooltime - Date.now()) / 1000));
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const updateCooltime = () => {
      if (remainingTime.current <= 0) {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
        return;
      }

      const minutes = Math.floor(remainingTime.current / 60);
      const seconds = remainingTime.current % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      setCooltimeState(`${formattedMinutes}:${formattedSeconds}`);

      remainingTime.current -= 1;
    };

    updateCooltime();
    intervalId.current = setInterval(updateCooltime, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [postCooltime]);

  return remainingTime.current > 0 ? (
    <button disabled className={classes.disableBtn}>
      {cooltimeState}
    </button>
  ) : (
    <button type="submit">
      <p>홍보하기</p>
    </button>
  );
}

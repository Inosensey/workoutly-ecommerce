import { useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";
import TimeBox from "./TimeBox";
import styles from "../../../../styles/Home/Timer.module.css";

function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetTime = new Date("12/31/2022 23:59:59");

    const interval = setInterval(() => {
      const dateToday = new Date();
      const dateDifference = targetTime.getTime() - dateToday.getTime();
      const numberOfDays = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
      const numberOfHours = Math.floor(
        (dateDifference % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)
      );
      const numberOfMinutes = Math.floor(
        (dateDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const numberOfSeconds = Math.floor((dateDifference % (1000 * 60)) / 1000);
      setDays(numberOfDays);
      setHours(numberOfHours);
      setMinutes(numberOfMinutes);
      setSeconds(numberOfSeconds);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <TimeBox Time={days} Label="Days" />
      <TimeBox Time={hours} Label="Hours" />
      <TimeBox Time={minutes} Label="Minutes" />
      <TimeBox Time={seconds} Label="Seconds" />
    </div>
  );
}

export default Timer;

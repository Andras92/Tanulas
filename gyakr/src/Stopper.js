import React, { useState, useEffect } from "react";

const Stopper = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const startTimer = () => {
    setRunning(true);
  };
  const stopTimer = () => {
    setRunning(false);
  };
  const resetTimer = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div>
      <h1>{time}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Stopper;

import React, { useRef,useState } from 'react'

const UseRefExample = () => {


  const timerRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <>
      <p>Seconds: {seconds}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </>
  );
}

export default UseRefExample;

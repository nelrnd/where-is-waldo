import { useState, useEffect } from 'react';
import '../styles/Timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  const incrementSeconds = () => setSeconds((s) => s + 1);

  const getFormattedTime = (seconds) => {
    const conv = (value) => value.toString().padStart(2, '0');
    const secInHour = 3600;
    const secInMinute = 60;
    let hours = 0;
    let minutes = 0;

    while (seconds >= secInHour) {
      seconds -= secInHour;
      hours++;
    }

    while (seconds >= secInMinute) {
      seconds -= secInMinute;
      minutes++;
    }

    return `${conv(hours)}:${conv(minutes)}:${conv(seconds)}`;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      incrementSeconds();
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return <div className="Timer">{getFormattedTime(seconds)}</div>;
};

export default Timer;

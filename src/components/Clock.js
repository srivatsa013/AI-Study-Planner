// src/components/Clock.js
import React, { useState, useEffect } from 'react';
import styles from './Clock.module.css'; // Import the CSS module

function Clock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateClockAndDate = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
      setTime(timeString);

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      setDate(dateString);
    };

    const intervalId = setInterval(updateClockAndDate, 1000);
    updateClockAndDate();

    return () => clearInterval(intervalId);
  }, []);

  return (
    // Use class names from the imported module
    <>
      <div className={styles.clock}>{time}</div>
      <div className={styles.date}>{date}</div>
    </>
  );
}

export default Clock;
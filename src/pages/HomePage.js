// src/pages/HomePage.js
import React from 'react';
import Clock from '../components/Clock';
import DayScheduleBox from '../components/DayScheduleBox';
import styles from './HomePage.module.css';

// Removed the old static scheduleData

// Keep static daily schedule content if needed
const dailyScheduleContent = [
    { time: '7:30 AM', subject: 'Science 📚' },
    { time: '9:55 AM', subject: 'Math 🔢' },
    { time: '11:00 AM', subject: 'Break ☕' },
    { time: '11:55 AM', subject: 'Social 🌍' },
    { time: '12:50 PM', subject: 'Music 🎵' }, // Note: Original had 12:50 here, 12:20 in checkboxes
    { time: '2:00 PM', subject: 'Art 🎨' },
    { time: '3:15 PM', subject: 'Sports ⚽' },
];

// Keep spotify URL
const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/7d4fKmCeimNawtkXZYKS9w?utm_source=generator&theme=0";

// Accept timetable prop
function HomePage({ timetable = [] }) { // Default to empty array

  // --- Helper function to get schedule items for a specific day ---
  const getItemsForDay = (dayName) => {
    // Filter the timetable data passed down from App.js
    // Ensure case-insensitive comparison
    return timetable.filter(item => item.day.toLowerCase() === dayName.toLowerCase())
      // Optional: Sort items by time if time format is consistent (e.g., HH:MM)
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  };
  // --- End Helper ---

  return (
    <>
      {/* Banner Section */}
      <div className="row">
        <div className="banner">
          <img src="/images/banner.png" alt="Banner Image" />
        </div>
      </div>

      {/* Main Content Row */}
      <div className="row">
        {/* Column 1: Clock and Static Daily Schedule */}
        <div className={styles.column}>
          <div className={`${styles.box} ${styles.small} ${styles.clook}`} >
            <Clock />
          </div>
          <div className={`${styles.box} ${styles.large} ${styles.dailyScheduleBox}`} >
             <div className={styles.dailyScheduleTitle}>Daily Schedule</div>
             <div className={styles.dailyScheduleContent}>
                  {dailyScheduleContent.map((item, index) => (
                      <React.Fragment key={index}>
                          {item.time} - {item.subject}<br />
                      </React.Fragment>
                  ))}
             </div>
          </div>
        </div>

        {/* Column 2: Mon, Wed, Fri Checkboxes */}
        <div className={styles.column}>
          {/* Pass filtered schedule data */}
          <DayScheduleBox
            day="monday"
            // Get items dynamically using the helper function
            scheduleItems={getItemsForDay("monday")}
            boxClassName={styles.box}
            smallBoxClassName={styles.small}
          />
          <DayScheduleBox
            day="wednesday"
            scheduleItems={getItemsForDay("wednesday")}
            boxClassName={styles.box}
            smallBoxClassName={styles.small}
          />
           <DayScheduleBox
             day="friday"
             scheduleItems={getItemsForDay("friday")}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
        </div>

        {/* Column 3: Tue, Thu Checkboxes (Add Sat/Sun if needed) */}
         <div className={styles.column}>
           <DayScheduleBox
             day="tuesday"
             scheduleItems={getItemsForDay("tuesday")}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
           <DayScheduleBox
             day="thursday"
             scheduleItems={getItemsForDay("thursday")}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
           {/* Example: Add Saturday/Sunday if desired */}
           {/*
           <DayScheduleBox
             day="saturday"
             scheduleItems={getItemsForDay("saturday")}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
           */}
         </div>

        {/* Column 4: Spotify */}
        <div className={styles.column}>
          <div className={`${styles.box} ${styles.extraLarge} ${styles.spotifyBox}`}>
            <div className={styles.spotifyTitle}>Spotify</div>
            <iframe
              className={styles.spotifyFrame}
              style={{ borderRadius: '12px' }}
              src={spotifyPlaylistUrl}
              width="100%"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
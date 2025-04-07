// src/pages/HomePage.js
import React from 'react';
import Clock from '../components/Clock';
import DayScheduleBox from '../components/DayScheduleBox';
import styles from './HomePage.module.css';

// NOTE: Define your actual schedule data here.
// Replace the example items below with the correct times and subjects for each day
// as they appear in your original index.html checkboxes.
// Make sure each item has a unique `id` for the checkbox state management to work correctly.
const scheduleData = {
    monday: [
        // Example: Replace with your actual Monday schedule items
        { id: 'mon_sci_730', time: '7:30', subject: 'Science' },
        { id: 'mon_math_955', time: '9:55', subject: 'Math' },
        { id: 'mon_break_1100', time: '11:00', subject: 'Break' },
        { id: 'mon_soc_1155', time: '11:55', subject: 'Social' },
        { id: 'mon_mus_1220', time: '12:20', subject: 'Music' }, // Check if time is 12:20 or 12:50 as in other box
    ],
    tuesday: [
        // Example: Replace with your actual Tuesday schedule items
        { id: 'tue_sci_730', time: '7:30', subject: 'Science' },
        { id: 'tue_math_955', time: '9:55', subject: 'Math' },
        { id: 'tue_break_1100', time: '11:00', subject: 'Break' },
        { id: 'tue_soc_1155', time: '11:55', subject: 'Social' },
        { id: 'tue_mus_1220', time: '12:20', subject: 'Music' },
        // ... add all Tuesday items with unique IDs
    ],
    wednesday: [
        // Example: Replace with your actual Wednesday schedule items
        { id: 'wed_sci_730', time: '7:30', subject: 'Science' },
        { id: 'wed_math_955', time: '9:55', subject: 'Math' },
        { id: 'wed_break_1100', time: '11:00', subject: 'Break' },
        { id: 'wed_soc_1155', time: '11:55', subject: 'Social' },
        { id: 'wed_mus_1220', time: '12:20', subject: 'Music' },
        // ... add all Wednesday items with unique IDs
    ],
    thursday: [
        // Example: Replace with your actual Thursday schedule items
        { id: 'thu_sci_730', time: '7:30', subject: 'Science' },
        { id: 'thu_math_955', time: '9:55', subject: 'Math' },
        { id: 'thu_break_1100', time: '11:00', subject: 'Break' },
        { id: 'thu_soc_1155', time: '11:55', subject: 'Social' },
        { id: 'thu_mus_1220', time: '12:20', subject: 'Music' },
        // ... add all Thursday items with unique IDs
    ],
    friday: [
        // Example: Replace with your actual Friday schedule items
        { id: 'fri_sci_730', time: '7:30', subject: 'Science' },
        { id: 'fri_math_955', time: '9:55', subject: 'Math' },
        { id: 'fri_break_1100', time: '11:00', subject: 'Break' },
        { id: 'fri_soc_1155', time: '11:55', subject: 'Social' },
        { id: 'fri_mus_1220', time: '12:20', subject: 'Music' },
        // ... add all Friday items with unique IDs
    ],
};

// NOTE: Define the content for the static "Daily Schedule" box here.
// Replace the example items below with the content from your original index.html 'daily-schedule' div.
const dailyScheduleContent = [
    { time: '7:30 AM', subject: 'Science 📚' },
    { time: '9:55 AM', subject: 'Math 🔢' },
    { time: '11:00 AM', subject: 'Break ☕' },
    { time: '11:55 AM', subject: 'Social 🌍' },
    { time: '12:50 PM', subject: 'Music 🎵' }, // Note: Original had 12:50 here, 12:20 in checkboxes
    { time: '2:00 PM', subject: 'Art 🎨' },
    { time: '3:15 PM', subject: 'Sports ⚽' },
];

// NOTE: Update the Spotify playlist URL if necessary.
// Replace the `src` attribute value in the iframe below if you want to embed a different playlist or resource.
const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/7d4fKmCeimNawtkXZYKS9w?utm_source=generator&theme=0";


function HomePage() {
  return (
    <>
      {/* Banner Section - Uses global classes */}
      <div className="row">
        <div className="banner">
           {/* NOTE: Ensure 'banner.png' exists in the public/images/ folder */}
          <img src="/images/banner.png" alt="Banner Image" />
        </div>
      </div>

      {/* Main Content Row */}
      <div className="row">
        {/* Column 1: Clock and Daily Schedule */}
        <div className={styles.column}>
          <div className={`${styles.box} ${styles.small} ${styles.clook}`} >
            <Clock />
          </div>
          <div className={`${styles.box} ${styles.large} ${styles.dailyScheduleBox}`} >
             <div className={styles.dailyScheduleTitle}>Daily Schedule</div>
             <div className={styles.dailyScheduleContent}>
                  {/* Render the daily schedule content defined above */}
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
          {/* Pass the actual schedule data defined above */}
          <DayScheduleBox
            day="monday"
            scheduleItems={scheduleData.monday}
            boxClassName={styles.box}
            smallBoxClassName={styles.small}
          />
          <DayScheduleBox
            day="wednesday"
            scheduleItems={scheduleData.wednesday}
            boxClassName={styles.box}
            smallBoxClassName={styles.small}
          />
           <DayScheduleBox
             day="friday"
             scheduleItems={scheduleData.friday}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
        </div>

        {/* Column 3: Tue, Thu Checkboxes */}
         <div className={styles.column}>
           <DayScheduleBox
             day="tuesday"
             scheduleItems={scheduleData.tuesday}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
           <DayScheduleBox
             day="thursday"
             scheduleItems={scheduleData.thursday}
             boxClassName={styles.box}
             smallBoxClassName={styles.small}
           />
         </div>

        {/* Column 4: Spotify */}
        <div className={styles.column}>
          <div className={`${styles.box} ${styles.extraLarge} ${styles.spotifyBox}`}>
            <div className={styles.spotifyTitle}>Spotify</div>
            <iframe
              className={styles.spotifyFrame}
              style={{ borderRadius: '12px' }}
              src={spotifyPlaylistUrl} // Use the variable defined above
              width="100%"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist" // Keep or update title
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
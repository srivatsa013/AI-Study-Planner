// src/pages/CalendarPage.js
import React, { useState, useEffect, useCallback } from 'react';
import styles from './CalendarPage.module.css'; // Import the module

const getReminderKey = (year, month, day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('calendarReminders');
    return savedReminders ? JSON.parse(savedReminders) : {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [reminderText, setReminderText] = useState('');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    localStorage.setItem('calendarReminders', JSON.stringify(reminders));
  }, [reminders]);

  const generateCalendarDays = useCallback(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      // Use module class 'day' and 'blank'
      daysArray.push(<div key={`blank-${i}`} className={`${styles.day} ${styles.blank}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = getReminderKey(currentYear, currentMonth, day);
      daysArray.push(
        // Use module class 'day'
        <div key={day} className={styles.day} onClick={() => openModal(dateKey)}>
          <span>{day}</span> {/* Wrap day number in span for styling */}
          {reminders[dateKey] && (
            // Use module class 'reminder'
            <div className={styles.reminder}>{reminders[dateKey]}</div>
          )}
        </div>
      );
    }
    return daysArray;
  }, [currentYear, currentMonth, reminders]); // Removed 'styles' dependency

  const prevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const openModal = (dateKey) => {
    setSelectedDateKey(dateKey);
    setReminderText(reminders[dateKey] || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDateKey(null);
    setReminderText('');
  };

  const handleReminderChange = (event) => {
    setReminderText(event.target.value);
  };

  const saveReminder = () => {
    if (selectedDateKey) {
      setReminders(prevReminders => {
        const updatedReminders = { ...prevReminders };
        if (reminderText.trim() !== "") {
          updatedReminders[selectedDateKey] = reminderText.trim();
        } else {
          delete updatedReminders[selectedDateKey];
        }
        return updatedReminders;
      });
    }
    closeModal();
  };

  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    // Use module class
    <div className={styles.calendarContainer}>
      {/* Use module class */}
      <div className={styles.header}>
        {/* Combine module classes */}
        <button className={`${styles.btn} ${styles.btnPrev}`} onClick={prevMonth}>◁</button>
        <h2 id="monthYear">{monthYearString}</h2>
        <button className={`${styles.btn} ${styles.btnNext}`} onClick={nextMonth}>▷</button>
      </div>
      {/* Use module class */}
      <div className={styles.calendar} id="calendar">
         {/* Use module class */}
        <div className={styles.dayHeader}>Sun</div>
        <div className={styles.dayHeader}>Mon</div>
        <div className={styles.dayHeader}>Tue</div>
        <div className={styles.dayHeader}>Wed</div>
        <div className={styles.dayHeader}>Thu</div>
        <div className={styles.dayHeader}>Fri</div>
        <div className={styles.dayHeader}>Sat</div>
        {generateCalendarDays()}
      </div>

      {/* Reminder Modal */}
      {isModalOpen && (
         // Use module class
        <div id="reminderModal" className={styles.reminderModal} >
          <h3>Add/Edit Reminder for {selectedDateKey}</h3>
          <input
             type="text"
             id="reminderText"
             placeholder="Enter reminder (or clear to remove)"
             value={reminderText}
             onChange={handleReminderChange}
          />
           {/* Use module class */}
           <div className={styles.modalActions}>
              {/* Combine module classes */}
             <button className={`${styles.btn} ${styles.btnSave}`} onClick={saveReminder}>Save</button>
             <button className={`${styles.btn} ${styles.btnClose}`} onClick={closeModal}>Cancel</button>
           </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
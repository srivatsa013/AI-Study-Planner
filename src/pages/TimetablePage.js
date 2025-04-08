// src/pages/TimetablePage.js
import React, { useState, useEffect } from 'react'; // Keep useState for isEditable
import styles from './TimetablePage.module.css';

// No longer need storage key or save/load logic here

// Define days for the dropdown
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]; // Or adjust as needed

function TimetablePage({ currentTimetable, onUpdateTimetable }) { // Accept props
  // Keep isEditable state if you still want the edit prompt/mode
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Prompt moved inside effect, runs only once on mount
    const wantsToEdit = window.confirm("Do you want to update the timetable?");
    setIsEditable(wantsToEdit);
  }, []); // Empty dependency array ensures this runs only once

  const handleInputChange = (index, field, value) => {
     if (!isEditable) return;
    const updatedTimetable = currentTimetable.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onUpdateTimetable(updatedTimetable); // Call the function passed from App.js
  };

  const addRow = () => {
    if (!isEditable) return;
    // Default to the first day or empty string
    const newRow = { id: Date.now(), day: daysOfWeek[0], time: '', subject: '' }; // Add unique ID
    const updatedTimetable = [...currentTimetable, newRow];
    onUpdateTimetable(updatedTimetable); // Update state in App.js
  };

  const removeRow = (indexToRemove) => {
      if (!isEditable) return;
      const updatedTimetable = currentTimetable.filter((_, index) => index !== indexToRemove);
      onUpdateTimetable(updatedTimetable); // Update state in App.js
  };

  return (
    <div className={styles.container}>
      <h2>Study Timetable {isEditable ? '(Editing Enabled)' : '(Read-Only)'}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Subject</th>
             {isEditable && <th>Action</th>}
          </tr>
        </thead>
        <tbody id="timetable-body">
          {/* Use currentTimetable from props */}
          {currentTimetable.map((item, index) => (
            // Use item.id for key if available, otherwise index
            <tr key={item.id || index}>
              <td>
                {/* --- Day Dropdown --- */}
                <select
                  value={item.day}
                  disabled={!isEditable} // Use disabled instead of readOnly for select
                  onChange={(e) => handleInputChange(index, 'day', e.target.value)}
                  style={{ // Basic styling, adjust in CSS module if needed
                      width: '95%',
                      padding: '8px 5px',
                      border: isEditable ? '1px solid #ccc' : '1px solid transparent',
                      borderRadius: '3px',
                      background: isEditable ? 'white' : '#f8f9fa',
                      cursor: isEditable ? 'pointer': 'not-allowed',
                      textAlign: 'center', // Or text-align-last for some browsers
                      color: isEditable ? 'black' : '#6c757d'
                   }}
                >
                  {/* Default option if needed */}
                  {/* <option value="" disabled={!!item.day}>Select Day</option> */}
                  {daysOfWeek.map(dayName => (
                    <option key={dayName} value={dayName}>
                      {dayName}
                    </option>
                  ))}
                </select>
                {/* --- End Day Dropdown --- */}
              </td>
              <td>
                <input
                  type='text' // Consider type='time' for better input?
                  value={item.time}
                  placeholder='Time (e.g., 09:00)'
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                  className={styles.tableInput} // Optional: Add class for specific input styling
                />
              </td>
              <td>
                <input
                  type='text'
                  value={item.subject}
                  placeholder='Subject'
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                  className={styles.tableInput} // Optional: Add class
                />
              </td>
               {isEditable && (
                    <td>
                        <button
                            className={styles.actionButton}
                            onClick={() => removeRow(index)}
                            disabled={!isEditable}
                        >
                            Delete
                        </button>
                    </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>

      {isEditable && (
        <button className={styles.addButton} onClick={addRow} disabled={!isEditable}>
            Add Class
        </button>
      )}
       {!isEditable && (
        <p className={styles.readOnlyMessage}>
            Refresh page and confirm to enable editing.
        </p>
       )}
    </div>
  );
}

export default TimetablePage;

// Optional: Add .tableInput class to TimetablePage.module.css if needed
/*
.tableInput {
    width: 95%;
    border: 1px solid transparent;
    text-align: center;
    background: transparent;
    color: black;
    font-size: 0.95rem;
    padding: 8px 5px;
    border-radius: 3px;
    transition: border-color 0.2s, background-color 0.2s;
}

.tableInput:focus {
    outline: none;
    border-color: #82c885;
    background-color: #f8f9fa;
}

.tableInput:read-only {
    background-color: #f8f9fa;
    cursor: not-allowed;
    border-color: #eee;
    color: #6c757d;
}
.tableInput:read-only:focus {
     background-color: #f8f9fa;
     border-color: #eee;
}
*/
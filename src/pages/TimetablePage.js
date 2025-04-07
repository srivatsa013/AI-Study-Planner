// src/pages/TimetablePage.js
import React, { useState, useEffect } from 'react';
import styles from './TimetablePage.module.css'; // Import the module

const TIMETABLE_STORAGE_KEY = 'timetable';

function TimetablePage() {
  const [timetable, setTimetable] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const storedTimetable = localStorage.getItem(TIMETABLE_STORAGE_KEY);
    if (storedTimetable) {
      setTimetable(JSON.parse(storedTimetable));
    }
    // Prompt moved inside effect, runs only once on mount
    const wantsToEdit = window.confirm("Do you want to update the timetable?");
    setIsEditable(wantsToEdit);
  }, []); // Empty dependency array ensures this runs only once

  const saveTimetable = (updatedTimetable) => {
    localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(updatedTimetable));
  };

  const handleInputChange = (index, field, value) => {
     if (!isEditable) return;
    const updatedTimetable = timetable.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setTimetable(updatedTimetable);
    saveTimetable(updatedTimetable);
  };

  const addRow = () => {
    if (!isEditable) return;
    const newRow = { day: '', time: '', subject: '' };
    const updatedTimetable = [...timetable, newRow];
    setTimetable(updatedTimetable);
    // Save will happen on input change in the new row
  };

  const removeRow = (indexToRemove) => {
      if (!isEditable) return;
      const updatedTimetable = timetable.filter((_, index) => index !== indexToRemove);
      setTimetable(updatedTimetable);
      saveTimetable(updatedTimetable);
  };

  return (
    // Use module class
    <div className={styles.container}>
      <h2>Study Timetable {isEditable ? '(Editing Enabled)' : '(Read-Only)'}</h2>
      {/* Use module class */}
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
          {timetable.map((item, index) => (
            <tr key={index}>
              <td>
                {/* Inputs implicitly styled via .table input in module */}
                <input
                  type='text'
                  value={item.day}
                  placeholder='Day'
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange(index, 'day', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={item.time}
                  placeholder='Time'
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={item.subject}
                  placeholder='Subject'
                  readOnly={!isEditable}
                  onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                />
              </td>
               {isEditable && (
                    <td>
                        {/* Use module class */}
                        <button
                            className={styles.actionButton}
                            onClick={() => removeRow(index)}
                            disabled={!isEditable} // Disable if not editable
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
         // Use module class
        <button className={styles.addButton} onClick={addRow} disabled={!isEditable}>
            Add Class
        </button>
      )}
       {!isEditable && (
         // Use module class
        <p className={styles.readOnlyMessage}>
            Refresh page and confirm to enable editing.
        </p>
       )}
    </div>
  );
}

export default TimetablePage;
// src/pages/TimetablePage.js
import React, { useState } from 'react'; // Removed useEffect as prompt is gone
import styles from './TimetablePage.module.css';

// Define days for the dropdown (keep this)
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function TimetablePage({ currentTimetable, onUpdateTimetable }) {
  // --- State for Edit Mode ---
  // Replace isEditable with isEditing, default to false (view mode)
  const [isEditing, setIsEditing] = useState(false);
  // --- End State ---

  // --- Remove the useEffect with window.confirm ---

  // --- Handlers (check isEditing) ---
  const handleInputChange = (index, field, value) => {
     if (!isEditing) return; // Check the new state variable
    const updatedTimetable = currentTimetable.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onUpdateTimetable(updatedTimetable);
  };

  const addRow = () => {
    if (!isEditing) return; // Check the new state variable
    const newRow = { id: Date.now(), day: daysOfWeek[0], time: '', subject: '' };
    const updatedTimetable = [...currentTimetable, newRow];
    onUpdateTimetable(updatedTimetable);
  };

  const removeRow = (indexToRemove) => {
      if (!isEditing) return; // Check the new state variable
      const updatedTimetable = currentTimetable.filter((_, index) => index !== indexToRemove);
      onUpdateTimetable(updatedTimetable);
  };

  // --- Toggle Edit Mode Handlers ---
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
    // No explicit save needed here, as changes were saved on input via onUpdateTimetable
    console.log("Exited edit mode.");
  };
  // --- End Toggle Handlers ---


  return (
    <div className={styles.container}>
      {/* Optional: Indicate edit mode in title */}
      <h2>Study Timetable {isEditing ? '(Editing)' : ''}</h2>

      {/* --- Add Edit/Done Buttons --- */}
      <div style={{ marginBottom: '15px', textAlign: 'right' }}> {/* Position buttons */}
        {!isEditing ? (
          <button onClick={handleEditClick} className={styles.editButton}> {/* Add specific style if needed */}
            Edit Timetable
          </button>
        ) : (
          <button onClick={handleDoneClick} className={styles.doneButton}> {/* Add specific style if needed */}
            Done Editing
          </button>
        )}
      </div>
      {/* --- End Edit/Done Buttons --- */}


      <table className={styles.table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Subject</th>
             {/* Show Action column only when editing */}
             {isEditing && <th>Action</th>}
          </tr>
        </thead>
        <tbody id="timetable-body">
          {currentTimetable.map((item, index) => (
            <tr key={item.id || index}>
              <td>
                <select
                  value={item.day}
                  disabled={!isEditing} // Control based on isEditing
                  onChange={(e) => handleInputChange(index, 'day', e.target.value)}
                  style={{ /* Your existing styles or use classes */
                      width: '95%',
                      padding: '8px 5px',
                      border: isEditing ? '1px solid #ccc' : '1px solid transparent',
                      borderRadius: '3px',
                      background: isEditing ? 'white' : '#f8f9fa',
                      cursor: isEditing ? 'pointer': 'not-allowed',
                      textAlign: 'center',
                      color: isEditing ? 'black' : '#6c757d'
                   }}
                >
                  {daysOfWeek.map(dayName => (
                    <option key={dayName} value={dayName}>{dayName}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type='text'
                  value={item.time}
                  placeholder='Time (e.g., 09:00)'
                  readOnly={!isEditing} // Control based on isEditing
                  onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                  className={styles.tableInput}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={item.subject}
                  placeholder='Subject'
                  readOnly={!isEditing} // Control based on isEditing
                  onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                  className={styles.tableInput}
                />
              </td>
               {/* Show Delete button only when editing */}
               {isEditing && (
                    <td>
                        <button
                            className={styles.actionButton}
                            onClick={() => removeRow(index)}
                            // No need for disabled check here as the column only shows when isEditing is true
                        >
                            Delete
                        </button>
                    </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Add Class button only when editing */}
      {isEditing && (
        <button className={styles.addButton} onClick={addRow}>
            Add Class
        </button>
      )}

       {/* Remove the old readOnlyMessage paragraph */}
    </div>
  );
}

export default TimetablePage;
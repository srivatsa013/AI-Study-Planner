// src/components/DayScheduleBox.js
import React, { useState, useEffect } from 'react';
import styles from './DayScheduleBox.module.css';

// Helper function to load state from localStorage
const loadCheckboxState = (day) => {
    try {
        const key = `checkboxState_${day}`;
        const storedState = localStorage.getItem(key);
        // Ensure storedState is valid JSON before parsing
        if (storedState) {
            return JSON.parse(storedState);
        }
        return {}; // Return empty object if nothing stored or invalid
    } catch (error) {
        console.error("Error loading checkbox state from localStorage for day:", day, error);
        localStorage.removeItem(`checkboxState_${day}`); // Clear corrupted data
        return {}; // Return empty object on error
    }
};

// Helper function to save state to localStorage
const saveCheckboxState = (day, state) => {
    try {
        const key = `checkboxState_${day}`;
        // Ensure state is serializable
        if (typeof state === 'object' && state !== null) {
            localStorage.setItem(key, JSON.stringify(state));
        } else {
             console.error("Attempted to save invalid state to localStorage for day:", day, state);
        }
    } catch (error) {
        console.error("Error saving checkbox state to localStorage for day:", day, error);
    }
};

function DayScheduleBox({ day, scheduleItems = [], boxClassName, smallBoxClassName }) {
    const [checkedItems, setCheckedItems] = useState(() => loadCheckboxState(day));

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setCheckedItems(prevState => {
            const newState = { ...prevState };
            if (checked) {
                newState[value] = true;
            } else {
                delete newState[value];
            }
            saveCheckboxState(day, newState); // Still saves check state locally
            return newState;
        });
    };

    useEffect(() => {
        setCheckedItems(loadCheckboxState(day));
    }, [day]);

    return (
        <div className={`${boxClassName} ${smallBoxClassName}`}>
            <div className={`${styles.sectionTitle} ${styles.days}`}>{day.toUpperCase()}</div>
            <div className={`${styles.schedule} ${styles.checks}`}>
                {/* Ensure items have a reasonably unique key for checkbox state */}
                {Array.isArray(scheduleItems) && scheduleItems.length > 0 ? (
                    scheduleItems.map((item, index) => {
                        // Use item.id if it's guaranteed unique and stable, otherwise fall back
                        const itemKey = item.id ? `item-${item.id}` : `${day}-${item.time}-${item.subject}-${index}`;
                        return (
                            <React.Fragment key={itemKey}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={`subject_${day}_${index}`}
                                        value={itemKey} // Use the key for state tracking
                                        checked={!!checkedItems[itemKey]}
                                        onChange={handleCheckboxChange}
                                    />
                                    {/* Use ?? for nullish coalescing */}
                                    {item.time ?? 'N/A'} - {item.subject ?? 'N/A'}
                                </label>
                            </React.Fragment>
                        );
                    })
                ) : (
                    // Display message if no items for the day
                    <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9em' }}>No schedule entries.</p>
                )}
            </div>
        </div>
    );
}

export default DayScheduleBox;
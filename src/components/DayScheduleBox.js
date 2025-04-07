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

function DayScheduleBox({ day, scheduleItems = [], boxClassName, smallBoxClassName }) { // Added default for scheduleItems
    // Initialize state using the load function
    const [checkedItems, setCheckedItems] = useState(() => loadCheckboxState(day));

    // Handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setCheckedItems(prevState => {
            const newState = { ...prevState }; // Create a new object for the new state
            if (checked) {
                newState[value] = true; // Set key to true if checked
            } else {
                delete newState[value]; // Remove the key if unchecked
            }
            // Save the new state immediately after setting it
            saveCheckboxState(day, newState);
            return newState; // Return the updated state
        });
    };

    // Effect to potentially reload state if 'day' prop changes (might not be needed depending on usage)
    // If DayScheduleBox instances are always mounted with a fixed 'day', this isn't strictly necessary.
    useEffect(() => {
        setCheckedItems(loadCheckboxState(day));
    }, [day]); // Reload state if the day prop were to change dynamically

    return (
        // Combine base box class with size modifier
        <div className={`${boxClassName} ${smallBoxClassName}`}>
            {/* Title using styles */}
            <div className={`${styles.sectionTitle} ${styles.days}`}>{day.toUpperCase()}</div>
            {/* Schedule list container */}
            <div className={`${styles.schedule} ${styles.checks}`}>
                {/* Ensure scheduleItems is an array before mapping */}
                {Array.isArray(scheduleItems) && scheduleItems.map((item, index) => {
                    // Use item.id if available, otherwise generate a key. Ensure item exists.
                    if (!item) return null; // Skip if item is somehow null/undefined
                    const itemKey = item.id || `${item.time}-${item.subject}` || `item-${index}`; // Fallback key
                    return (
                        <React.Fragment key={itemKey}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={`subject_${day}_${itemKey}`} // Make name more unique
                                    value={itemKey} // Use the unique key as the value
                                    checked={!!checkedItems[itemKey]} // Check if the key exists and is truthy in state
                                    onChange={handleCheckboxChange}
                                />
                                {/* Defensive check for item properties */}
                                {item.time || 'N/A'} - {item.subject || 'N/A'}
                            </label>
                        </React.Fragment>
                    );
                 })}
                 {/* Optional: Message if scheduleItems is empty */}
                 {(!Array.isArray(scheduleItems) || scheduleItems.length === 0) && (
                    <p>No schedule items for this day.</p>
                 )}
            </div>
        </div>
    );
}

export default DayScheduleBox;
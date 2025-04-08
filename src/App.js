// src/App.js
import React, { useState, useEffect } from 'react'; // Keep useState, useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CalendarPage from './pages/CalendarPage';
import TimetablePage from './pages/TimetablePage';
// Keep the Firebase auth functions
import { onAuthStateChanged, signInWithGoogle, signOut } from './firebase/auth';

// Define storage key for timetable (NEW)
const TIMETABLE_STORAGE_KEY = 'timetable';

function App() {
  // Keep existing auth state
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Add state for the timetable (NEW)
  const [timetable, setTimetable] = useState(() => {
    // Load initial timetable from localStorage
    try {
      const storedTimetable = localStorage.getItem(TIMETABLE_STORAGE_KEY);
      return storedTimetable ? JSON.parse(storedTimetable) : []; // Default to empty array
    } catch (error) {
      console.error("Error reading timetable from localStorage:", error);
      return [];
    }
  });

  // Keep existing effect for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoadingAuth(false);
      console.log('Auth state changed, user:', currentUser ? currentUser.email : 'null');
    });
    return () => unsubscribe();
  }, []); // Keep empty dependency array []

  // Add new effect to save timetable to localStorage when it changes (NEW)
  useEffect(() => {
    try {
      localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(timetable));
      console.log("Timetable saved to localStorage");
    } catch (error) {
       console.error("Error saving timetable to localStorage:", error);
    }
  }, [timetable]); // Run this effect when timetable state changes

  // Keep existing sign-in handler
  const handleSignIn = async () => {
    setLoadingAuth(true);
    try {
      await signInWithGoogle();
      console.log("Sign in attempt successful (or popup closed)");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert(`Sign in failed: ${error.message}`);
      setLoadingAuth(false);
    }
  };

  // Keep existing sign-out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Sign out successful");
    } catch (error) {
      console.error("Error during sign out:", error);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  // Add function for TimetablePage to update timetable state (NEW)
  const updateTimetable = (newTimetable) => {
    setTimetable(newTimetable);
  };

  // Keep existing loading check
  if (loadingAuth) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px', fontSize: '1.5rem' }}>Loading Authentication...</div>;
  }

  // Keep existing Router structure
  return (
    <Router>
      {/* Keep Navigation, passing auth props */}
      <Navigation user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      {/* Keep page wrapper */}
      <div className="page-content-wrapper">
        <Routes>
          {/* Modify HomePage Route to pass timetable prop (MODIFIED) */}
          <Route
            path="/"
            element={<HomePage timetable={timetable} />}
           />

          {/* Keep AboutPage Route */}
          <Route path="/about-us" element={<AboutPage />} />

          {/* Keep CalendarPage Route */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* Modify TimetablePage Route to pass props (MODIFIED) */}
          <Route
            path="/update-timetable"
            element={<TimetablePage currentTimetable={timetable} onUpdateTimetable={updateTimetable} />}
           />

          {/* Keep other routes if any */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
      {/* Keep Footer if any */}
      {/* <Footer /> */}
    </Router>
  );
}

// Keep existing export
export default App;
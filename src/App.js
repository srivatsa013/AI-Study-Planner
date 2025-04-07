// src/App.js
import React, { useState, useEffect } from 'react'; // Add useState, useEffect back
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CalendarPage from './pages/CalendarPage';
import TimetablePage from './pages/TimetablePage';
// Import the Firebase auth functions
import { onAuthStateChanged, signInWithGoogle, signOut } from './firebase/auth';

function App() {
  // Add state for user and loading status
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // Start as true

  // Effect to listen for auth changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(currentUser => {
      setUser(currentUser); // Update user state (will be null if logged out)
      setLoadingAuth(false); // Auth check is complete
      console.log('Auth state changed, user:', currentUser ? currentUser.email : 'null');
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Sign-in handler
  const handleSignIn = async () => {
    setLoadingAuth(true); // Optionally show loading indicator during sign-in attempt
    try {
      await signInWithGoogle();
      // State will be updated by onAuthStateChanged listener
      console.log("Sign in attempt successful (or popup closed)");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert(`Sign in failed: ${error.message}`); // Provide feedback to user
      setLoadingAuth(false); // Ensure loading stops on error
    }
    // setLoadingAuth(false); // Set loading false here if you don't want loading during listener update
  };

  // Sign-out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      // State will be updated by onAuthStateChanged listener
      console.log("Sign out successful");
    } catch (error) {
      console.error("Error during sign out:", error);
      alert(`Sign out failed: ${error.message}`); // Provide feedback
    }
  };

  // Optional: Show loading message while checking auth status initially
  if (loadingAuth) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px', fontSize: '1.5rem' }}>Loading Authentication...</div>;
  }

  return (
    <Router>
      {/* Pass user state and handlers to Navigation */}
      <Navigation user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
      {/* Wrapper for page content */}
      <div className="page-content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/update-timetable" element={<TimetablePage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
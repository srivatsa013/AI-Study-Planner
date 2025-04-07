// src/App.js
import React from 'react'; // Removed useState, useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CalendarPage from './pages/CalendarPage';
import TimetablePage from './pages/TimetablePage';
// Removed firebase/auth imports

function App() {
  // Removed user and loadingAuth state
  // Removed useEffect for onAuthStateChanged
  // Removed handleSignIn and handleSignOut functions

  // Removed the loading check

  return (
    <Router>
      {/* Pass no auth-related props to Navigation */}
      <Navigation />
      {/* Wrapper for page content */}
      <div className="page-content-wrapper"> {/* Optional: Add a class if you need to style the page container area */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/update-timetable" element={<TimetablePage />} />
          {/* NOTE: Add a 404 Not Found Route component here if desired */}
          {/* Example: <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
      {/* NOTE: You can add a shared Footer component here if your design requires one */}
      {/* Example: <Footer /> */}
    </Router>
  );
}

export default App;
// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
// No longer need user, onSignIn, onSignOut props

function Navigation() {
  // No longer need defaultAvatarPath or user logic

  return (
    <nav>
      <ul>
        {/* Ensure 'logoweb.png' exists in public/images/ folder */}
        <li><img src="/images/logoweb.png" alt="logo" className="nav-logo" /></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/update-timetable">Update Timetable</Link></li>
        {/* Removed the entire list item containing the conditional auth button/user info */}
      </ul>
    </nav>
  );
}

export default Navigation;
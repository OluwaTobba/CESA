import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcome-screen">
      <div className="logo">C</div>
      <div className="text">CESA</div>
      <p>Your safety is our priority.<br />Report crimes and request escorts with ease.</p>
      <div className="button-container">
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>Create Account</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;

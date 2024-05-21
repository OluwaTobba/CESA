import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthenticationPage.css';

function AuthenticationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phoneNumber } = location.state;
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSendCode = () => {
    if (selectedOption) {
      // Simulate sending a code
      const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
      localStorage.setItem('verificationCode', verificationCode);
      navigate('/confirmation', { state: { selectedOption, email, phoneNumber } });
    }
  };

  return (
    <div className="authentication">
      <h1>Two-Factor Authentication (2FA)</h1>
      <p>Select your preferred option for account verification</p>
      <button onClick={() => handleOptionChange('phone')} className={selectedOption === 'phone' ? 'selected' : ''}>Phone number</button>
      <button onClick={() => handleOptionChange('email')} className={selectedOption === 'email' ? 'selected' : ''}>Email Address</button>
      <button onClick={handleSendCode} className="send-code-button">Send Code</button>
    </div>
  );
}

export default AuthenticationPage;

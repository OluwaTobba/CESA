import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ConfirmationPage.css';

function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedOption, email, phoneNumber } = location.state;
  const [code, setCode] = useState(new Array(5).fill(''));
  const [error, setError] = useState('');

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 4 && value) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    const savedCode = localStorage.getItem('verificationCode');
    if (enteredCode === savedCode) {
      localStorage.removeItem('verificationCode');
      alert('Verification successful');
      navigate('/login');
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="confirmation">
      <h1>Confirmation</h1>
      <p>Enter the five-digit code sent to your {selectedOption === 'email' ? `email ${email}` : `phone number ${phoneNumber}`}</p>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            maxLength="1"
          />
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleVerify} className="verify-button">Verify</button>
    </div>
  );
}

export default ConfirmationPage;

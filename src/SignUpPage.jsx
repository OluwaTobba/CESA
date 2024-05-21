import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.email) formErrors.email = 'Email address is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone number is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const checkUserExists = (email, phoneNumber) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email || user.phoneNumber === phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (checkUserExists(formData.email, formData.phoneNumber)) {
      setErrors({ ...errors, form: 'User with this email or phone number already exists' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/authentication', { state: { email: formData.email, phoneNumber: formData.phoneNumber } });
  };

  return (
    <div className="signup">
      <div className="header">
        <div className="logo">C</div>
        <h1>Hello!</h1>
        <p>Enter your details to create an account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Create password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <p>By creating an account, you agree to our <a href="#">Terms and Privacy Policy</a>.</p>
        {errors.form && <p className="error">{errors.form}</p>}
        <button type="submit" className="submit-button">Create an account</button>
      </form>
      <p className="login-link">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
    </div>
  );
}

export default SignUpPage;

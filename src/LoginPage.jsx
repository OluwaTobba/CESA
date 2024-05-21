import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = 'Email address is required';
    if (!formData.password) formErrors.password = 'Password is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate API call
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const user = users.find(
        (user) => user.email === formData.email && user.username === formData.password // Assuming username as password for demo purposes
      );

      if (user) {
        if (formData.rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        navigate('/');
      } else {
        setErrors({ form: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login">
      <div className="header">
        <div className="logo">C</div>
        <h1>Welcome to <span>CESA</span></h1>
        <p>Please login to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-options">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
          <span className="forgot-password">Forgot password?</span>
        </div>
        {errors.form && <p className="error">{errors.form}</p>}
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p className="or-login-with">Or login with</p>
      <div className="social-login">
        <button className="google-button">Google</button>
        <button className="facebook-button">Facebook</button>
      </div>
      <p className="create-account">Don't have an account? <span onClick={() => navigate('/signup')}>Create</span></p>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isNewOrg, setIsNewOrg] = useState(true); // Optional, not used in backend now

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        organizationName: orgName, // 👈 Correct key
      });

      alert('Registered successfully!');
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      if (err.response?.data?.message) {
        alert('Registration failed: ' + err.response.data.message);
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        <label className="checkbox-label">
          <input type="checkbox" checked={isNewOrg} onChange={(e) => setIsNewOrg(e.target.checked)} />
          Create New Organization
        </label>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;

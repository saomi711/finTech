import React, { useState } from 'react';
import AuthService from '../../services/auth.service';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(email, password);
      // Handle successful registration, e.g., show a success message or redirect to login page
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error messages if necessary
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

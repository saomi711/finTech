import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { UserContext } from '../../contexts/user.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login_response = await AuthService.login(email, password);
      console.log(login_response);
      if (login_response.data.token) {
        const { id, email, username } = login_response.data.user; // Assuming the API returns user data
        console.log(username);
        setUser({
            id,
            email,
            username,
            token: login_response.data.token,
        });
        
        localStorage.setItem('token', login_response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error messages if necessary
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { useAuth } from '../../contexts/auth.context';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login_response = await AuthService.register(username, email, password);
      console.log(login_response);
      if (login_response.data.token) {
        //setUser(login_response.data.user);
        localStorage.setItem('token', login_response.data.token);
        setLoggedIn(true);
        return navigate(-1);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Register</Typography>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { UserContext } from '../../contexts/user.context';
import App from '../../App';
import NavBar from '../navbar/navbar.component';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, CssBaseline, Grid } from '@material-ui/core';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login_response = await AuthService.login(email, password);
      console.log(login_response);
      if (login_response.data.token) {
        //setUser(login_response.data.user);
        localStorage.setItem('token', login_response.data.token);
        return navigate(-1);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error messages if necessary
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography align="center">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default Login;

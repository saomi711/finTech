// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import { useAuth } from '../../contexts/auth.context';

const Logout = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setLoggedIn(false);
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div>
      <Grid container justify="center">
      <Typography variant="h6">Logout</Typography>
      </Grid>
      <Grid container justify="center">
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      </Grid>
    </div>
  );
};

export default Logout;

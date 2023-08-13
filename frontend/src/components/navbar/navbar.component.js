import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useAuth } from '../../contexts/auth.context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const { loggedIn,user } = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            finTech
          </Typography>
          <Button component={Link} to="/" className={classes.link}>
            Home
          </Button>
          
          {!loggedIn ? (
            <>
              <Button component={Link} to="/login" className={classes.link}>
                Login
              </Button>
              <Button component={Link} to="/register" className={classes.link}>
                Register
              </Button>
            </>
          ) : null}
          {loggedIn ? (
            <>
              <Button component={Link} to="/income" className={classes.link}>
                Income
              </Button>
              <Button component={Link} to="/expense" className={classes.link}>
                Expense
              </Button>
              <Button component={Link} to="/logout" className={classes.link}>
                Logout
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;

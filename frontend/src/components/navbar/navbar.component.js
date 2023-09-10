import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useAuth } from '../../contexts/auth.context';
import AuthService from '../../services/auth.service';

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
  //const [loggedIn, setLoggedIn] = useState(false);
  const { loggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    
  }, [loggedIn]);

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
          ) : (
          
            <>
              <Button component={Link} to="/income" className={classes.link}>
                Income
              </Button>
              <Button component={Link} to="/expense" className={classes.link}>
                Expense
              </Button>
              <Button component={Link} to="/goal" className={classes.link}>
                Goal
              </Button>
              <Button component={Link} to="/bankAccount" className={classes.link}>
                Bank Account
              </Button>
              <Button component={Link} to="/logout" className={classes.link}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;

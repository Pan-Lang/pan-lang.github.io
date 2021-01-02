import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Button } from '@material-ui/core';
import CollapsingButton from './CollapsingButton';
import { makeStyles } from '@material-ui/core/styles';
import {
  ABOUT,
  ORDER_FORM,
  ORDER_TRACKER,
  SIGN_IN,
  STOCK,
} from '../../constants/Routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

/**
 * Responsive navigation menu
 * Base code from: https://codesandbox.io/s/64kr4k1lww?file=/demo.js
 */
function CollapsingMenu() {
  const [user, loading, error] = useAuthState(auth);
  
  // Pages to navigate to
  const fullNavigation = [
    { page: 'About', to: ABOUT },
    { page: 'Order Form', to: ORDER_FORM },
    { page: 'Order Tracker', to: ORDER_TRACKER },
    { page: 'Stock', to: STOCK },
  ];
  
  // Only show About page when user is not logged in
  const navigation = Boolean(user) ? fullNavigation : [ fullNavigation[0] ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Mobile */}
      <CollapsingButton>
        {navigation.map((nav) => (
          <MenuItem key={nav.to} component={Link} to={nav.to}>
            {nav.page}
          </MenuItem>
        ))}
        <MenuItem component={Link} to={SIGN_IN}>
          Login
        </MenuItem>
      </CollapsingButton>

      {/* Desktop */}
      <nav className={classes.buttonBar} id="appbar-collapse">
        {navigation.map((nav) => (
          <Button
            component={Link}
            className={classes.link}
            to={nav.to}
            key={nav.to}
          >
            {nav.page}
          </Button>
        ))}
        <Button
          component={Link}
          to={SIGN_IN}
          variant="contained"
          className={classes.login}
        >
          Sign in
        </Button>
      </nav>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: 0,
  },
  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    margin: '10px',
    paddingLeft: '16px',
    right: 0,
    position: 'relative',
    width: '100%',
    background: 'transparent',
  },
  link: {
    margin: theme.spacing(1, 1),
    color: 'gray',
  },
  login: {
    margin: '10px',
  },
}));

export default CollapsingMenu;

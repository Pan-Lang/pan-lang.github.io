import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Button } from '@material-ui/core';
import CollapsingButton from './CollapsingButton';
import { makeStyles } from '@material-ui/core/styles';

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

// Pages to navigate to
const navigation = [
  { page: 'About', to: '/about' },
  { page: 'Order Form', to: '/order' },
  { page: 'Order Tracker', to: '/order-tracker' },
  { page: 'Stock', to: '/stock' },
];

/**
 * Responsive navigation menu
 * Base code from: https://codesandbox.io/s/64kr4k1lww?file=/demo.js
 */
function CollapsingMenu() {
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
        <MenuItem component={Link} to="/login">
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
          to="/login"
          variant="contained"
          className={classes.login}
        >
          Login
        </Button>
      </nav>
    </div>
  );
}

export default CollapsingMenu;

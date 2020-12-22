import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import CollapsingMenu from './CollapsingMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navigation: {
    backgroundColor: 'white',
  },
  toggleDrawer: {},
  appTitle: {},
}));

/**
 * Navigation bar at the top of window
 */
function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navigation}>
      <Toolbar>
        {/* Logo */}
        <Link to="/">
          <img
            src={require('../images/logo_nobg.png')}
            alt="Pan-Lang"
            style={{ width: 75, height: 75 }}
          />
        </Link>

        {/* Navigation menu */}
        <CollapsingMenu />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

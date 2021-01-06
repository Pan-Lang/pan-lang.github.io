import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import CollapsingMenu from './CollapsingMenu';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

/**
 * Navigation bar at the top of window
 */
function Navbar() {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.navigation}>
        <Toolbar>
          {/* Logo */}
          <Link to="/">
            <img
              src={require('../../images/logo_nobg.png')}
              alt="Pan-Lang logo"
              style={{ width: 75, height: 75 }}
            />
          </Link>

          {/* Navigation menu */}
          <CollapsingMenu />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navigation: {
    backgroundColor: 'white',
  },
}));

export default Navbar;

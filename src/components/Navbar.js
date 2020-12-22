import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Link as MaterialLink,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
}));

function NavBar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <img
            src={require('../images/logo_nobg.png')}
            alt="Pan-Lang"
            style={{ width: 75, height: 75 }}
          />
        </Link>
        <nav>
          <MaterialLink component={Link} variant="button" to="/about">
            About
          </MaterialLink>
          <MaterialLink component={Link} variant="button" to="/order">
            Order Form
          </MaterialLink>
          <MaterialLink component={Link} variant="button" to="/order-tracker">
            Order Tracker
          </MaterialLink>
          <MaterialLink component={Link} variant="button" to="/stock">
            Stock Dashboard
          </MaterialLink>
        </nav>
        <Button href="#" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

// function NavigationBar() {
//   return (
//     <Navbar collapseOnSelect={true} bg="light" expand="lg" fixed="top">
//       <Navbar.Brand href="#home" as={Link} to="/">
//         <div>
//           <img
//             src={require('../images/logo_nobg.png')}
//             alt="Pan-Lang"
//             style={{ width: 75, height: 75 }}
//           ></img>
//         </div>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link eventKey="0" as={Link} to="/">
//             Home
//           </Nav.Link>
//           <Nav.Link eventKey="1" as={Link} to="/about">
//             About
//           </Nav.Link>
//           <Nav.Link eventKey="2" as={Link} to="/order">
//             Order
//           </Nav.Link>
//           <Nav.Link eventKey="3" as={Link} to="/stock">
//             Stock
//           </Nav.Link>
//           <Nav.Link eventKey="4" as={Link} to="/order-tracker">
//             Order Tracker
//           </Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

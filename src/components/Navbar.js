import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
  return (
    <Navbar collapseOnSelect={true} bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home" as={Link} to="/">
        <div id="logo">
          <img
            src={require('../images/logo.png')}
            alt="Pan-Lang"
            style={{ width: 150, height: 45 }}
          ></img>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey="0" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link eventKey="1" as={Link} to="/order">
            Order
          </Nav.Link>
          <Nav.Link eventKey="2" as={Link} to="/stock">
            Stock
          </Nav.Link>
          <Nav.Link eventKey="3" as={Link} to="/order-tracker">
            Order Tracker
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;

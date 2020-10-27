import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home" as={Link} to="/">
        <div id="logo">
          <img src={require('../images/logo.png')} alt="Pan-Lang" style={{width:150, height:45}}></img>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/order">Order</Nav.Link>
          <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
          <Nav.Link as={Link} to="/order-tracker">Order Tracker</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;

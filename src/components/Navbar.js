import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
  return (
    <Navbar bg="light">
      <Navbar.Brand as={Link} to="/">
        <div id="logo">
          <img src={require('../images/logo.png')} alt="Pan-Lang" style={{width:100, height:45}}></img>
        </div>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/order">Order</Nav.Link>
        <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;

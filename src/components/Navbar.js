import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">PanLang</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/order" >Order</Nav.Link>
        <Nav.Link href="/stock">Stock</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;

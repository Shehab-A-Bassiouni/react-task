// Header.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Body from './Body';

function Header() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src="./vite.svg" alt="logo" /> Route Assessment</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;

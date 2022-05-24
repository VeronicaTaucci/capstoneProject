
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = () => {
  return (
      <>
          <Navbar bg="primary" variant="dark" expand="lg">
              <Container>
                  <Navbar.Brand href="#home">NoNameApp</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link href="/home">Home</Nav.Link>
                          <Nav.Link href="/comments">Comments</Nav.Link>
                          <Nav.Link href="/signout">Sign Out</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>

      </>
  )
}

export default NavbarComponent


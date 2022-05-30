import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
const NavbarComponent = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container fluid>
                <Navbar.Brand href="/home"><img src='../../Logo1.png'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto links">
                            <Nav.Link href="/displayalbum">Albums</Nav.Link>
                        </Nav>
                            <Nav.Link href="/signout">Sign Out</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavbarComponent

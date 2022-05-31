import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container fluid>
                <Link to='/home'><Navbar.Brand><img src='../../Logo1.png'></img></Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto links">
                            <Link to="/displayalbum" color="white">Albums</Link>
                        </Nav>

                        <Link to="/signout" color="white">Sign Out</Link>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavbarComponent

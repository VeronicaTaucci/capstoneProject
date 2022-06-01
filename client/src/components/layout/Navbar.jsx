import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import '../styles/navandfooter.css'

const NavbarComponent = () => {
    return (
        <>
            <Navbar bg="primary" expand="lg">
                <Container fluid>
                    <Link className="me-auto links" to='/home'><Navbar.Brand className="link"><img src='../../Logo1.png'></img></Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto links">
                            <Link className="link" to="/displayalbum">Albums</Link>
                        </Nav>
                        <Link className="link" to="/signout">Sign Out</Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent

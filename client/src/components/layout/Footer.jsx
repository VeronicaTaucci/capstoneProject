import React from 'react'
import '../styles/footer.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
    return (
        <>
            <footer className="footer-txt">
               
                <Container fluid className="footer">
                        <div>
                            Happy Shares © 2022
                        </div>
                        <div>
                        <Nav.Link href="https://github.com/violetmedina">Violet Medina</Nav.Link>
                        <Nav.Link href="https://github.com/VeronicaTaucci">Veronica Taucci</Nav.Link>
                        <Nav.Link href="https://github.com/chloeWieser">Chloe Wieser</Nav.Link> 
                        </div>
                        
                </Container>
            </footer>
        </>
    )
}

export default Footer
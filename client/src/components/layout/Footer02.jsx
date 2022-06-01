import React from 'react'
import '../styles/footerSignIn.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const FooterSignIn = () => {
    return (
        <>

            <footer className="footer">
                <div className='contributors'>
                    Happy Shares © 2022
                </div>
                <ul className='contributors'>
                    <li> <a href="https://github.com/violetmedina">Violet Medina</a></li>
                    <li><a href="https://github.com/VeronicaTaucci">Veronica Taucci</a></li>
                    <li> <a href="https://github.com/chloeWieser">Chloe Wieser</a></li>
                </ul>

            </footer>
        </>
    )
}

export default FooterSignIn
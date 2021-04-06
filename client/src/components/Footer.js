
import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import NoftIcon from '../assets/nofttestlogo.png';

// Styling
import "./Footer.css";
import "./Footer.pushdown.css"

export default function Footer() {
    return (
        <footer data-component="Footer" id="footer" className="footer section container-fluid">
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Nav.Link as={Link} to='/about'><img src={NoftIcon}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Noft Custom Icon" /></Nav.Link>
                    {/* <Nav.Link className="text-bold" as={Link} to="/upload">Test: Upload</Nav.Link>
                    <Nav.Link className="text-bold" as={Link} to="/test-param/3">Test: Component with ID</Nav.Link> */}
                    <Nav.Link className="text-bold" as={Link} to="/about/team">NoFTeam</Nav.Link>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/Siphon880gh/reprint/" className="text-bold nav-link">Github</a>
                    <span className="text-bold text-white nav-link">Reprint © 2021</span>
                </Container>
            </Navbar>
        </footer>
    )
}

export function FooterPushDown() {
    return (
        <div className="footer-pushdown">
        </div>
    )
}


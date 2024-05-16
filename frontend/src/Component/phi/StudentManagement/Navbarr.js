import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Sidebar from "./sidebar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar'; // Renaming import for clarity
import logo from "../../Assets/logo.png";
import Header from "./Header";
function CustomNavbar() {
  return (
    <>
    
      
      <BootstrapNavbar bg="primary" data-bs-theme="dark">
        <Container>
          <BootstrapNavbar.Brand href="#home">Ministry Of Health
          </BootstrapNavbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contacts">Contact us</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </BootstrapNavbar>

      
    </>
  );
}

export default CustomNavbar;

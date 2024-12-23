import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./index.css";

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar expand="lg" className="navbar-custom " variant="dark">
      <Container>
        <Navbar.Brand href="/">Desafio Token Lab</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse id="navbar-nav" className={isOpen ? "show" : ""}>
          <Nav className="ms-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">Sobre</Nav.Link>
            <Nav.Link href="/services">Serviços</Nav.Link>
            <Nav.Link href="/contact">Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;

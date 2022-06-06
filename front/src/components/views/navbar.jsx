import React from 'react'
import { Container  ,Navbar , Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logo.png'


const NavSection= () => {
   
    return (
            
        <div>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/"><img src={logo} alt="Logo" width="40"
        height="40"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto p-2">
    <Nav.Link href="/Blog">Blog</Nav.Link>
        <Nav.Link href="/Onas">O nas</Nav.Link>
        <Nav.Link href="/wyniki">Wyniki</Nav.Link>
      <Nav.Link href="">Nadchodzące Mecze</Nav.Link>
      <Nav.Link href="#features">Zgłoś Drużynę</Nav.Link>
      <Nav.Link href="#pricing">Drużyny</Nav.Link>
     
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}

export default NavSection
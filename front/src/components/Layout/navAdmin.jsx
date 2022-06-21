import React from 'react'
import { Container  , Button , Nav , Navbar , NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'


export default function NavAdmin() {
    const history = useHistory()
  return (
    <div> <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/app">Panel Administracyjny</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/addPosts">Dodawanie Postów</Nav.Link>
        <Nav.Link href="/addPlayers">Informacje o zawodnikach</Nav.Link>
        <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/addTeams">Drużyna</NavDropdown.Item>
          <NavDropdown.Item href="/addLastscore">Ostatnie Wyniki</NavDropdown.Item>
          <NavDropdown.Item href="/addIncoming">Nadchodzące Spotkania</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link>Admin</Nav.Link>
        
          <Button onClick={() => {
                      localStorage.clear()
                      history.push('/login')
                  }}>Wyloguj</Button>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar></div>
  )
}

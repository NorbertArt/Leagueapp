import React, { useState } from 'react'
import { Container  , Form , Button , Nav , Navbar , NavDropdown} from 'react-bootstrap'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'

const Layout = () => {
  const history = useHistory()
	const [team, setTeam] = useState("")
	const [match, setMatch] = useState("")
	const [score , setScore] = useState("")
	const [league, setLeague] = useState("")
  

	const leagueAdd= ()=>{
		Axios.post("http://localhost:4000/league" , {
			league:league
		}).then(()=>{
         console.log("Udało sie dodać")
		})
	}
	const TeamAdd= ()=>{
		Axios.post("http://localhost:4000/team" , {
      league:league,  
      Team:team,
      match:match,
      score:score
		}).then(()=>{
         console.log("Udało sie dodać")
		})
	}
	return (
   <div>
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Panel Administracyjny</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Dodawanie Postów</Nav.Link>
      <Nav.Link href="#pricing">Informacje o zawodnikach</Nav.Link>
      <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Liga</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Drużyna</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Admin</Nav.Link>
      
        <Button onClick={() => {
                    localStorage.clear()
                    history.push('/login')
                }}>Wyloguj</Button>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  
		<Container>
		<h1>Dodawanie Drużyny do ligi</h1>
    
	<Form className='col-lg-6 col-sm-12'>
  <Form.Group className="mb-3"  >
    <Form.Label>Nazwa drużyny</Form.Label>
    <Form.Control type="Text" placeholder="Nazwa" onChange={(e) =>{
        setTeam((e.target.value))}}/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Rozegrane mecze</Form.Label>
    <Form.Control type="number" placeholder="Mecze" onChange={(e) =>{
        setMatch((e.target.value))}}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
	  <Form.Label>Wybierz Lige</Form.Label>
  <Form.Select id="Select" onChange={(e) =>{
        setLeague((e.target.value))}}>
        <option>Wybierz lige</option>

      </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Punkty</Form.Label>
    <Form.Control type="number" placeholder="Punkty" onChange={(e) =>{
        setScore((e.target.value))}}/>
  </Form.Group>
  <Button variant="primary" onClick={TeamAdd}>
   Dodaj
  </Button>
  <h1>Dodawanie ligi</h1>
  <div id="alert"></div>
<Form.Group className="mb-3"  >
    <Form.Label>Nazwa ligi</Form.Label>
    <Form.Control type="text" placeholder="Nazwa" onChange={(e) =>{
        setLeague((e.target.value))}}/>
  </Form.Group>
  <Button variant="primary" onClick={leagueAdd}>
   Dodaj
  </Button>
</Form>
		</Container>
    </div>
	)
}

export default Layout
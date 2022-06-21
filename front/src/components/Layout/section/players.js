import {useState , useEffect} from 'react'
import NavAdmin from '../navAdmin';
import {Form , Button , Container , Card, ListGroup , Table} from 'react-bootstrap'
import Axios from 'axios'
import logo from '../../views/img/logo2.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export default function Players() {
    const [Name, setName] = useState("")
    const [Position, setPosition] = useState("")
    const [DisplayTeam, setDisplayTeam] = useState("")
    const [Team, setTeamSelected] = useState("")
    const [Number, setNumber] = useState("")
    const [PlayersDisplay, setPlayersDisplay] = useState("")
    const DelatePlayers = (id)=>{
        Axios.delete(`http://localhost:4000/Players/delete/${id}`).then(()=>{
             alert("Udało się usunąć")
             window.location.reload()
        })
      }
      const PlayersAdd= ()=>{
		Axios.post("http://localhost:4000/Players" , {
            Name:Name,
            Position:Position,
            Number:Number,
            Team:Team
		}).then(()=>{
          alert("Udało się dodać")
		})
	}
    useEffect(()=>{
        Axios.get("http://localhost:4000/Players").then((data)=>{
            setPlayersDisplay(data.data)
              
        })
       },[])
       useEffect(()=>{
        Axios.get("http://localhost:4000/Team").then((data)=>{
            setDisplayTeam(data.data)
        })
       },[])
  return (
    <div>
    <NavAdmin/>
    <Container className='pb-5'><div className='text-center mt-3'>
          <img src={logo} className='img-fluid'></img>
          </div>

        <Form className='col-lg-6 col-sm-12 mx-auto mt-4'>
          
        <Form.Group className="mb-3">
    <Form.Label>Imię Nazwisko</Form.Label>
    <Form.Control type="Text" placeholder="Nazwa" onChange={(e) =>{
        setName((e.target.value))}}/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Pozycja</Form.Label>
    <Form.Select aria-label="Default select example" onChange={(e) =>{
        setPosition((e.target.value))}}>
      <option></option>
      <option>Bramkarz</option>
      <option>Lewy Środkowy Obrońca</option>
      <option>Prawy Środkowy Obrońca</option>
      <option>Lewy Obrońca</option>
      <option>Prawy Obrońca</option>
      <option>Defensywny Pomocnik</option>
      <option>Ofensywny Pomocnik</option>
      <option>Lewy Pomocnik</option>
      <option>Prawy Pomocnik</option>
      <option>Skrzydłowy</option>
      <option>Napastnik</option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
	  <Form.Label>Wybierz Drużynę</Form.Label>
       <Form.Select aria-label="Default select example" onChange={(e) =>{
        setTeamSelected((e.target.value))
        }}>
          {Array.from(DisplayTeam).map((val,key)=>{
      return(
          <option>{val.Druzyna}</option>
      )
      
    })}
      <option>Wybierz Drużynę</option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Nr Koszulki</Form.Label>
    <Form.Control type="text" placeholder="Nr" onChange={(e) =>{
        setNumber((e.target.value))}}/>
  </Form.Group>
      <div className='text-center'>
  <Button variant="primary" type="submit" className='col-lg-4 col-12' onClick={PlayersAdd}>
   Dodaj
  </Button>
    </div>
  </Form>
  <Card className='col-lg-6 col-sm-12 mx-auto mt-5'>
  <Card.Header className='text-center'>Piłkarze</Card.Header>
  <ListGroup variant="flush">
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Imię Nazwisko</th>
        <th>Pozycja</th>
        <th>Nr</th>
        <th>Liga</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {Array.from(PlayersDisplay).map((val,key)=>{
      return(
      <tr> 
        <td>{val.id}</td>
        <td>{val.Nazwa}</td>
        <td>{val.Pozycja}</td>
        <td>{val.nr}</td>
        <td>{val.Team}</td>
        <td><Button variant='danger' onClick={()=>{DelatePlayers(val.id)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
      </tr>
      )
     })}
    </tbody>
  </Table>
  </ListGroup>
</Card>
  
  </Container>
    </div>
  )
}

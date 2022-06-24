import {useState , useEffect} from 'react'
import { Container ,Card , Form ,Button , ListGroup , Table} from 'react-bootstrap'
import NavAdmin from '../navAdmin'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

export default function AddLastscore() {
    const [Team1,setTeam1] = useState("")
    const [score,setScore] = useState("")
    const [Team2,setTeam2] = useState("")
    const [DisplayScore , setDisplayScore] = useState([""])
    const [DisplayTeam, setDisplayTeam] = useState("")
    
    const ScoreAdd= ()=>{
      Axios.post("http://limanowskasuperliga.pl:4000/LastMatch" , {
        Team1:Team1,
        score:score,
        Team2:Team2
      }).then(()=>{
           alert("Dodano!")
           window.location.reload()
      })
    }
    useEffect(()=>{
      Axios.get("http://limanowskasuperliga.pl:4000/LastMatch").then((data)=>{
          setDisplayScore(data.data)
      })
     },[])
     const DelateLastScore= (id)=>{
      Axios.delete(`http://limanowskasuperliga.pl:4000/LastMatch/delete/${id}`).then(()=>{
           alert("Udało się usunąć")
           window.location.reload()
      })
    }
    useEffect(()=>{
      Axios.get("http://limanowskasuperliga.pl:4000/Team").then((data)=>{
          setDisplayTeam(data.data)
          console.log(data.data)
            
      })
     },[])
  return (
    <div>
    <NavAdmin/>
    <Container>
    <Card className='col-lg-6 col-sm-12 mx-auto mt-5'>
  <Card.Header className='text-center'>Wszystkie Wyniki</Card.Header>
  <ListGroup variant="flush">
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Druzyna</th>
      <th>Wynik</th>
      <th>Druzyna</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {Array.from(DisplayScore).map((val,key)=>{
      return(
      <tr>
        <td>{val.id}</td>
        <td>{val.Druzyna1}</td>
        <td>{val.Wynik}</td>
        <td>{val.Druzyna2}</td>
        <td><Button variant='danger'onClick={()=>{DelateLastScore(val.id)}}><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></Button></td>
        </tr>
      )
      
    })}
    
  </tbody>
  
</Table>
<Card className='mx-auto text-center'>
      <Card.Header>Dodawanie</Card.Header>
      <Card.Body>
      <Form className='mt-3 text-center'>
        <div className='row'>
  <Form.Group className="col-5 mb-3">
           <Form.Select aria-label="Default select example"  onChange={(e) =>{
        setTeam1((e.target.value))
        }}>
          <option></option>
          {Array.from(DisplayTeam).map((val,key)=>{
      return(
          <option>{val.Druzyna}</option>
      )
      
    })}
    </Form.Select>
  </Form.Group>
  <Form.Group className="col-2 p-0">
    <Form.Control className="text-center" type="text" placeholder="Wynik"  onChange={(e) =>{
       setScore((e.target.value))}}/>
  </Form.Group>

  <Form.Group className="col-5 mb-3">
           <Form.Select aria-label="Default select example" onChange={(e) =>{
        setTeam1((e.target.value))
        }}>
          <option></option>
          {Array.from(DisplayTeam).map((val,key)=>{
      return(
          <option>{val.Druzyna}</option>
      )
      
    })}
    </Form.Select>
  </Form.Group>
  <div className='text-center'>
  <Button variant="primary" className='col-lg-4 col-12 mx-auto' onClick={ScoreAdd}>
   Dodaj
  </Button>
  </div>
  </div>
</Form>
      </Card.Body>
    </Card>
  </ListGroup>
</Card> 

    </Container>
    </div>
  )
}

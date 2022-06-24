import {useState , useEffect} from 'react'
import { Container ,Card,Form ,Button , ListGroup , Table} from 'react-bootstrap'
import NavAdmin from '../navAdmin'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Addincoming() {
    const [Team1,setTeam1] = useState("")
    const [Team2,setTeam2] = useState("")
    const [Date, setDate] = useState("")
    const [incoming , setIncoming] = useState("")
    const [DisplayTeam, setDisplayTeam] = useState("")
    const addComing= ()=>{
      Axios.post("http://limanowskasuperliga.pl:4000/Incoming" , {
        Team1:Team1,
        Date:Date,
        Team2:Team2
      }).then(()=>{
           alert("Dodano!")
      })
    }
    useEffect(()=>{
      Axios.get("http://limanowskasuperliga.pl:4000/Incoming").then((data)=>{
          setIncoming(data.data)
      })
     },[])
     const DelateIncoming = (id)=>{
      Axios.delete(`http://limanowskasuperliga.pl:4000/Incoming/delete/${id}`).then(()=>{
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
  <Card.Header className='text-center'>Nadchodzące Mecze</Card.Header>
  <ListGroup variant="flush">
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Druzyna</th>
      <th>Data</th>
      <th>Druzyna</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {Array.from(incoming).map((val,key)=>{
      return(
      <tr>
        <td>{val.id}</td>
        <td>{val.Druzyna1}</td>
        <td>{val.Data}</td>
        <td>{val.Druzyna2}</td>
        <td><Button variant='danger' onClick={()=>{DelateIncoming(val.id)}}><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></Button></td>
        </tr>
      )
      
    })}
    
  </tbody>
  
</Table>

  </ListGroup>
  <Card className=' mx-auto text-center'>
      <Card.Header>Dodawanie</Card.Header>
      <Card.Body>
      <Form className='mt-3 text-center'>
        <div className='row'>
  <Form.Group className="col-6 mb-3">
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
  <Form.Group className="col-6 mb-3">
        <Form.Select aria-label="Default select example"  onChange={(e) =>{
        setTeam2((e.target.value))
        }}>
          <option></option>
          {Array.from(DisplayTeam).map((val,key)=>{
      return(
          <option>{val.Druzyna}</option>
      )
      
    })}
    </Form.Select>
  </Form.Group>
    <div>
  <input type="date" onChange={(e) =>{
       setDate((e.target.value))}}></input>
  </div>
  <div className='text-center'>
  <Button variant="primary" type="submit" className='col-lg-4 col-12 mt-3' onClick={addComing}>
   Dodaj
  </Button>
  </div>
  </div>
</Form>
      </Card.Body>
    </Card>
</Card> 
  
    </Container>
    </div>
  )
}

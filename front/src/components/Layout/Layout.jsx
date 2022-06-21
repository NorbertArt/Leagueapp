import React, { useState ,useEffect} from 'react'
import { Container  , Form , Button , Card, ListGroup , Table} from 'react-bootstrap'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'
import NavAdmin from './navAdmin'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import logo from '../views/img/logo2.png'

const Layout = () => {
  const history = useHistory()
	const [league, setLeague] = useState("")
  const [displayLeague , setDisplayLeague] = useState("")

	const leagueAdd= ()=>{
		Axios.post("http://localhost:4000/league" , {
			league:league
		}).then(()=>{
         alert("Udało się dodać ligę")
         window.location.reload()
		})
	}
  const DelateLeague= (id)=>{
		Axios.delete(`http://localhost:4000/league/delete/${id}`).then(()=>{
         alert("Udało się usunąć Lige")
         window.location.reload()
		})
	}
  useEffect(()=>{
    Axios.get("http://localhost:4000/league").then((data)=>{
      setDisplayLeague(data.data)
    })
   },[])
	return (
   <div>
    <NavAdmin/>
		<Container>
    <Card className='col-lg-6 col-sm-12 mx-auto mt-5'>
  <Card.Header className='text-center'>Wszystkie Ligi</Card.Header>
  <ListGroup variant="flush">
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Liga</th>
    </tr>
  </thead>
  <tbody>
    {Array.from(displayLeague).map((val,key)=>{
      return(
      <tr>
        <td>{val.id}</td>
        <td>{val.Nazwa_ligi}</td>
        <td><Button variant='danger' onClick={()=>{DelateLeague(val.id)}}><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></Button></td>
        </tr>
      )
      
    })}
     <tr>
      <td>
      </td>
        <td><Form.Control type="text" placeholder="Nazwa Ligi" onChange={(e) =>{
              setLeague((e.target.value))}}/></td>
        <td><Button onClick={leagueAdd}>Dodaj</Button></td>
        </tr>
  </tbody>
</Table>
  </ListGroup>
</Card> 
		</Container>
     </div>
	)
}

export default Layout
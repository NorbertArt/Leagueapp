import {useEffect,useState} from 'react'
import Axios from 'axios'
import { useParams ,useHistory} from 'react-router-dom'
import {Container , Card ,Button ,Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavSection from './navbar'
import Footer from './footer'

export default function TeamSelected() {
    
    let {TeamId} = useParams()
    const [TeamPlayers , setTeamPlayers] = useState({})
    let history = useHistory()
    useEffect(()=>{
            Axios.get(`http://limanowskasuperliga.pl:4000/Team/Players/getFromId/${TeamId}`).then((data)=>{
                setTeamPlayers(data.data)
                console.log(data.data)
            })
    },[])
  return (
    <div>
        <NavSection/>
        <Container>
        {Array.from(TeamPlayers).map((val,key)=>{
        return(
            <div>
            <h1 className='text-center mt-5'>{val.Druzyna}</h1>
            <div className='row'>
    <div className='col-lg-7 mt-5'>
    <Card className='shadow'>
  <Card.Header className='text-center p-3'>Skład</Card.Header>
  <Card.Body className='row pt-0'>
  <Table  bordered hover className='m-0'>
  <thead>
    <tr className=''> 
      <th>#</th>
      <th>Imie Nazwisko</th>
      <th>Pozycja</th>
      <th>Nr Koszulki</th>
    </tr>
  </thead>
  <tbody>
  {val.Players.map(Player => <tr>
        <td></td>
        <td>{Player.Nazwa}</td>
        <td>{Player.Pozycja}</td>
        <td>{Player.nr}</td>
        </tr>)}
  </tbody>
</Table>
    </Card.Body>
  </Card>
</div>
          <div className='col-lg-5 mt-2  pl-3'>
            <div className='text-center'>
            <img src={"/image/Team/" + val.image} className='mb-3' width="200" height="200"></img>
            </div>
            <h1 className='text-center mb-4 mt-3'>Opis Drużyny</h1>
            <small className="text-muted">{val.Slug}</small>
          </div>
          <Button className='col-lg-2 mx-auto m-5' variant='danger' onClick={()=>{
                      history.push("/Druzyny")
                    }}>Wróc</Button>
    </div>
    </div>
    )
})}
</Container>
        <Footer/>
    </div>
     
  )
}

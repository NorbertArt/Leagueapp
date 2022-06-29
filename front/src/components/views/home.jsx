import {useEffect , useState ,sort} from 'react'
import { Table,Card , Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import { useHistory} from 'react-router-dom';
import Footer from './footer'

export default function Home() {
        const [DisplayTable ,setDisplayTable] = useState([])
        const [incoming , setIncoming] =  useState("")
        const [lastmatch ,setLastMatch] = useState("")
        let history = useHistory()
        const sortAsc = (a, b) => a - b;
        useEffect(()=>{
            Axios.get("http://limanowskasuperliga.pl:4000/Table").then((data)=>{
                setDisplayTable(data.data)
                console.log(data.data)
            })
           },[])   
           useEffect(()=>{
            Axios.get("http://limanowskasuperliga.pl:4000/Incoming").then((data)=>{
                const index = data.data.length
                setIncoming(data.data[index - 1])
            })
           },[])  
           useEffect(()=>{
            Axios.get("http://limanowskasuperliga.pl:4000/LastMatch").then((data)=>{
              const index2 = data.data.length
                setLastMatch(data.data[index2 - 1])
            })
           },[])
  return (    
    <div>
    <div className='row'>
      <div className='col-lg-8 mb-4 float-left'>
      {DisplayTable.map((val,key)=>{
        return(
  <Card className='mb-4 shadow'>
    <Card.Header>{val.Nazwa_ligi}</Card.Header>
    <Table  bordered hover >
  <thead>
    <tr> 
      <th>#</th>
      <th>Drużyna</th>
      <th>Rozegrane Mecze</th>
      <th>Punkty</th>
    </tr>
  </thead>
  <tbody>
    
      {Array.from(val.teams.sort((a, b) => a.Punkty > b.Punkty ? 1:-1 ).reverse().map(team => 
      <tr>
        
        <td></td>
        <td>{team.Druzyna}</td>
        <td>{team.Mecze}</td>
        <td>{team.Punkty}</td>
        </tr>
        
        ))}
  </tbody>

</Table>
  </Card>
  )
})}
  </div>
  
  <div className='col-lg-4'>
      <a className='text-decoration-none' href='/Nadchodzące-Mecze'>
      <Card className='shadow'>
  <Card.Header className='text-dark'>Nadchodzące Spotkania</Card.Header>
  <Card.Body className='row'>
      
        <div className='row  mx-auto'>
        <div className='col-5'>
        <Alert variant="secondary">
              {incoming ? incoming.Druzyna1 : <p></p>}
        </Alert>
        </div>
        <div className='col-2 mt-3 text-dark'>VS</div>
        <div className='col-5'>
        <Alert variant="secondary">
        {incoming ? incoming.Druzyna2: <p></p>}
        </Alert>
        </div>
        <div className='text-muted'>{incoming ? incoming.Data : <p></p>}</div>
        </div>
 
    
    </Card.Body>
   
  </Card>
    </a>
    <a className='text-decoration-none' href='/wyniki'>
      <Card className='mt-5 shadow'>
  <Card.Header className='text-dark'>Ostatnie mecze</Card.Header>
  <Card.Body className='row'> 
    <div className='col-5'>
    <Alert variant="secondary">
      {lastmatch ?lastmatch.Druzyna1 : <p></p>}
    </Alert>
    </div>
    <div className='col-2 mt-3 text-dark'>{lastmatch ? lastmatch.Wynik : <p></p>}</div>
    <div className='col-5'>
    <Alert variant="secondary">
      {lastmatch ? lastmatch.Druzyna2 : <p></p>}
    </Alert>
    </div>
    </Card.Body>
  </Card>
  </a>
  </div>
  </div>
  </div>
  )
}

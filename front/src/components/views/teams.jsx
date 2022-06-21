import {useEffect , useState}from 'react'
import NavSection from './navbar'
import {Container , Card ,Alert ,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import Footer from './footer';
import {useHistory} from 'react-router-dom'
export default function Teams() {
  let history = useHistory()
  const [Team, setTeam] = useState("")
  useEffect(()=>{
    Axios.get("http://localhost:4000/Team").then((data)=>{
        setTeam(data.data)  
    })
   },[])
  return (
    <div>
        <NavSection/>
    <Container>
            <h1 className='mt-4'>Wszystkie Drużyny</h1>
            <p>Kliknij na wybrana drużyna aby zobaczyć szczegóły</p>
            <div className='row'>
    {Array.from(Team).map((val,key)=>{
        return(
    <div className='col-lg-4'>
    <Card className='shadow mt-5'>
  <Card.Header className='p-3 text-center'>{val.Druzyna}</Card.Header>
  <img className='mt-3 mx-auto' src={"/image/Team/" + val.image} width="120" height="120" ></img>
  <Card.Body className='row'>
          
        <div className='row p-0 text-center mx-auto'>
        <div className='col-5'>
        </div>
        <div className='col-5'>
        </div>
        <div className='text-center'></div>
        </div>
        <Button variant='danger' className='col-4 mx-auto' onClick={()=>{
                      history.push(`/Team/Players/${val.id}`)
                    }}>Więcej</Button>
    
    </Card.Body>
   
  </Card>
</div>
    )})}
    </div>
    </Container>
    <Footer/>
    </div>
  )
}

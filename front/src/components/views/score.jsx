import {useEffect , useState} from 'react'
import NavSection from './navbar'
import {Container , Card ,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory} from 'react-router-dom';
import Axios from 'axios'
import Footer from './footer';


export default function Score() {
    const [Score , setScore] =  useState("")
    let history = useHistory()

    useEffect(()=>{
        Axios.get("http://limanowskasuperliga.pl:4000/lastmatch").then((data)=>{
            setScore(data.data)
        })
       },[]) 
  return (
    <div>
    <NavSection/>
    <Container>
    <h1 className='mt-5 mb-4'>Ostatnie Wyniki</h1>
    <div className='row'>
    {Score ? Array.from(Score).map((val,key)=>{
        return(
    <div className='col-lg-4'>
    <Card className='shadow mb-4'>
  <Card.Header className='p-3'></Card.Header>
  <Card.Body className='row'>
      
        <div className='row p-0 text-center mx-auto'>
        <div className='col-5'>
        <Alert variant="secondary">
              {val.Druzyna1}
        </Alert>
        </div>
        <div className='col-2 mt-3 text-center'>{val.Wynik}</div>
        <div className='col-5'>
        <Alert variant="secondary">
        {val.Druzyna2}
        </Alert>
        </div>
        <div className='text-center'></div>
        </div>
 
    
    </Card.Body>
   
  </Card>
</div>
    )}): <Alert variant='danger'>Brak Wyników....</Alert>}
    </div>
    </Container>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
   
    </div>
  )
}

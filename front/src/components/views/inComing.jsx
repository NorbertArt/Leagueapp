import {useEffect , useState} from 'react'
import NavSection from './navbar'
import {Container , Card ,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory} from 'react-router-dom';
import Axios from 'axios'
import Footer from './footer';


export default function InComing() {
    const [incoming , setIncoming] =  useState("")
    let history = useHistory()

    useEffect(()=>{
        Axios.get("http://limanowskasuperliga.pl:4000/Incoming").then((data)=>{
            setIncoming(data.data)
        })
       },[]) 
  return (
    <div>
    <NavSection/>
    <Container>
    <h1 className='mt-5 mb-4'>Nadchodzące Spotkania</h1>
    <div className='row'>
    {Array.from(incoming).map((val,key)=>{
        return(
    <div className='col-lg-4'>
    <Card className='shadow'>
  <Card.Header className='p-3'></Card.Header>
  <Card.Body className='row'>
      
        <div className='row p-0 text-center mx-auto'>
        <div className='col-5'>
        <Alert variant="secondary">
              {val.Druzyna1}
        </Alert>
        </div>
        <div className='col-2 mt-3 text-center'>VS</div>
        <div className='col-5'>
        <Alert variant="secondary">
        {val.Druzyna2}
        </Alert>
        </div>
        <div className='text-center'>{val.Data}</div>
        </div>
 
    
    </Card.Body>
   
  </Card>
</div>
    )})}
    </div>
    </Container>
    <br></br>
    <br></br>
    <Footer/>
    </div>

  )
}

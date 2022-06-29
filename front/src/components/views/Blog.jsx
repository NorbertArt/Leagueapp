import {useEffect , useState } from 'react'
import {CardGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card ,Button}from 'react-bootstrap'
import NavSection from './navbar'
import Axios from 'axios'
import style from './style.css'
import { useHistory} from 'react-router-dom';
import Footer from './footer';


const Blog= () => {
    const [post ,setPost] = useState([])
    let history = useHistory()

    useEffect(()=>{
        Axios.get("http://limanowskasuperliga.pl:4000/Blog").then((data)=>{
            setPost(data.data)
        })
       },[])   
    return (
            
        <div>
            <NavSection/>
           <div className='container'>
               <div className='row'>
           <h1 className='Nag'>Blog</h1>
           <p className="text-muted">Tutaj znajdują się nasze wpisy dotyczące spotkań i nie tylko</p>
           {post.map((val,key)=>{
                  const img = "http://limanowskasuperliga.pl/image/Blog/" + val.Image
               return(
                <CardGroup className='col-md-4 mt-5'>
                <Card className='shadow'> 
                  <Card.Header>Wpis nr {val.id}</Card.Header>
                  <img src={img} className='img-fluid'></img>
                  <Card.Body>
                  
                    <Card.Title>{val.Title}</Card.Title >
                    <Card.Text>
                      {val.Content.length > 150 ? val.Content.substring(0,150) + '....' :val.Content}
                    </Card.Text>
                  </Card.Body>
                  <Button variant='danger' className='col-4 mx-auto mb-3' onClick={()=>{
                      history.push(`/Blog/post/${val.id}`)
                    }}>Zobacz więcej</Button>
                  <Card.Footer>
                    <small className="text-muted">{"Opublikowano" + " " + val.Time}</small>
                  </Card.Footer>
          
                  </Card>
                  </CardGroup>
                  
               )
           })}
           </div>
           </div>
           <Footer/>
        </div>
    )
}

export default Blog
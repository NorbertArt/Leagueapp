import {useEffect , useState } from 'react'
import { Container  ,Navbar , Nav, CardGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card ,Button}from 'react-bootstrap'
import NavSection from './navbar'
import Axios from 'axios'
import style from './style.css'
import { useHistory} from 'react-router-dom';


const Blog= () => {
    const [post ,setPost] = useState([])
    let history = useHistory()

    useEffect(()=>{
        Axios.get("http://localhost:4000/Blog").then((data)=>{
            setPost(data.data)
        })
       },[])   
    return (
            
        <div>
            <NavSection/>
           <div className='container'>
               <div className='row'>
           <h1 className='Nag'>Blog</h1>
           {post.map((val,key)=>{
               return(
                <CardGroup className='col-md-4 mt-5'>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>{val.Title}</Card.Title>
                    <Card.Text>
                      {val.Content}
                    </Card.Text>
                  </Card.Body>
                  <Button className='button-blog' 
                  onClick={()=>{
                      history.push(`/Blog/post/${val.id}`)
                    }}>Zobacz więcej</Button>
                  <Card.Footer>
                    <small className="text-muted">{val.Time}</small>
                  </Card.Footer>
          
                  </Card>
                  </CardGroup>
               )
           })}
           </div>
           </div>
        </div>
    )
}

export default Blog
import {useEffect , useState}from 'react'
import { useParams ,useHistory} from 'react-router-dom'
import NavSection from './navbar'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card ,Container , Button} from "react-bootstrap"

export default function Post() {
    let {postId} = useParams()
    const [post , setPost] = useState({})
    let history = useHistory()
    useEffect(()=>{
            Axios.get(`http://limanowskasuperliga.pl:4000/Blog/post/getFromId/${postId}`).then((data)=>{
                setPost({Title:data.data[0].Title , Content:data.data[0].Content , id:data.data[0].id ,Image:data.data[0].Image ,Time:data.data[0].Time })
            })
    },[])
  return (
      
    <div>
        <NavSection/>
        <Container>
        <Card className='mt-5 mb-5 col-10 mx-auto'>
  <Card.Header>Wpis nr {post.id}</Card.Header>
  <div className='col-12'><img className="mb-5 img-fluid col-12" src={"http://limanowskasuperliga.pl/image/Blog/" + post.Image}></img></div>
  <Card.Body className='pt-0'>
    
  
    <Card.Title className='mb-3'><h1>{post.Title}</h1></Card.Title>
    <Card.Text>
      {post.Content}
      
    </Card.Text>
    <div><small className="text-muted">{"Opublikowano" + " " + post.Time}</small></div>
    <Button variant="danger" className="mt-3" onClick={()=>{
                      history.push("/Blog")
                    }}>Wróć</Button>
  </Card.Body>
</Card>
  </Container>
    </div>
  )
}

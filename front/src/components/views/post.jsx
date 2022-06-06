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
            Axios.get(`http://localhost:4000/Blog/post/getFromId/${postId}`).then((data)=>{
                setPost({Title:data.data[0].Title , Content:data.data[0].Content , id:data.data[0].id})
            })
    },[])
  return (
    
    <div>
        <NavSection/>
        <Container>
        <Card className='mt-5'>
  <Card.Header>Wpis nr {post.id}</Card.Header>
  <Card.Body>
    <Card.Title>{post.Title}</Card.Title>
    <Card.Text>
      {post.Content}
    </Card.Text>
    <Button variant="primary" onClick={()=>{
                      history.push("/Blog")
                    }}>Wróć</Button>
  </Card.Body>
</Card>
  </Container>
    </div>
  )
}

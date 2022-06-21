import {useState , useEffect} from 'react'
import { Container  , Table ,Button , Form} from 'react-bootstrap'
import Axios from 'axios'
import { useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import NavAdmin from './../navAdmin';

export default function AddPost() {
    const [Title , setTitle] = useState("")
    const [Content , setContent] = useState("")
    const [post ,setPost] = useState([])
    const [alertErr , setAlertErr] = useState("")
    const [image , setImageName] = useState("")
    let history = useHistory()

    
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
     });    

    const handleInputChange = (event) => {
      setuserInfo({
        ...userInfo,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
      });
      setImageName(event.target.files[0].name)
    }
    useEffect(()=>{
        Axios.get("http://localhost:4000/Blog").then((data)=>{
            setPost(data.data)
        })
       },[])


 const PostAdd = async()=>{
  const formdata = new FormData(); 
  formdata.append('avatar', userInfo.file);

		Axios.post("http://localhost:4000/Blog" , {
        Title:Title,
        Content:Content,
        image:image
		}) 
    Axios.post("http://localhost:4000/imageupload",formdata,{   
      headers: { "Content-Type": "multipart/form-data" } 
    })
    alert("Udało się dodać")
    window.location.reload()

	}   
  const DelatePost = (id ,Image)=>{
    Axios.delete(`http://localhost:4000/Blog/delete/${id}`)
    Axios.delete(`http://localhost:4000/imageupload/delate/${Image}`)
    
    window.location.reload()
    alert("Udało się usunąć")
  }
  return (
   <div>
   <NavAdmin/>
   <Container>
    <h1 className='mt-3 text-muted'>Dodawanie Postów</h1>
    <Table striped bordered hover className='mt-4'>
    <thead>
      <tr>
        <th>#</th>
        <th>Tytuł</th>
        <th>Treść</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {post.map((val,key)=>{
      return(
      <tr> 
        <td>{val.id}</td>
        <td>{val.Title}</td>
        <td>{val.Content}</td>
        <td><Button variant='danger' onClick={()=>{DelatePost(val.id ,val.Image)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
      </tr>
      )
     })}
     <tr> 
        <td></td>
        <td><Form.Control type="text" placeholder='Tytuł' onChange={(e) =>{
        setTitle((e.target.value))}}></Form.Control></td>
        <td><Form.Control as="textarea" placeholder='Treść' onChange={(e) =>{
        setContent((e.target.value))}}></Form.Control>
        
        <Form.Group controlId="formFile" className="mb-3 mt-3 col-sm-4">
        <Form.Label>Wybierz Zdjęcie</Form.Label>
        <Form.Control type="file" name="upload_file" onChange={handleInputChange}
        />
      </Form.Group>
        </td>
        <td><Button onClick={PostAdd}>Dodaj Post</Button></td>
      </tr>
    </tbody>
  </Table></Container>
  </div>
  )
}

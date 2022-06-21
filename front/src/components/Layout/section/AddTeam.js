import {useState , useEffect} from 'react'
import NavAdmin from '../navAdmin';
import {Form , Button , Container , Card, ListGroup , Table} from 'react-bootstrap'
import Axios from 'axios'
import logo from '../../views/img/logo2.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export default function AddTeam() {
  const [Liga , setLeagueSelected] = useState("")
  const [displayLeague , setdisplayLeague] = useState("")
  const [team, setTeam] = useState("")
  const [league, setleague] = useState("")
  const [teamDisplay, setTeamDisplay] = useState("")
	const [match, setMatch] = useState("")
	const [score , setScore] = useState("")
  const [Slug , setSlug] = useState("")
  const [image , setImageName] = useState("")
  
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
  const TeamAdd= ()=>{
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);
    
		Axios.post("http://localhost:4000/Team" , {
      team:team,
      match:match,
      score:score,
      Liga:Liga,
      Slug:Slug,
      image:image
		})
    Axios.post("http://localhost:4000/imageupload/Team",formdata,{   
      headers: { "Content-Type": "multipart/form-data" } 
    })
    alert("Udało się dodać")
    window.location.reload()
	}
  useEffect(()=>{
    Axios.get("http://localhost:4000/League").then((data)=>{
        setdisplayLeague(data.data)
        console.log(data.data)
          
    })
   },[])
   useEffect(()=>{
    Axios.get("http://localhost:4000/Team").then((data)=>{
        setTeamDisplay(data.data)
        console.log(data.data)
          
    })
   },[])
   const DelateTeam = (id ,image)=>{
    Axios.delete(`http://localhost:4000/Team/delete/${id}`)
    Axios.delete(`http://localhost:4000/imageupload/Team/delate/${image}`)

    alert("Udało się usunąć")
    window.location.reload()
  }
  return (
    <div>  
        <NavAdmin/>
    <Container className='pb-5'><div className='text-center mt-3'>
          <img src={logo} className='img-fluid'></img>
          </div>

        <Form className='col-lg-6 col-sm-12 mx-auto mt-4'>
          
        <Form.Group className="mb-3">
    <Form.Label>Nazwa drużyny</Form.Label>
    <Form.Control type="Text" placeholder="Nazwa" onChange={(e) =>{
        setTeam((e.target.value))}}/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Rozegrane mecze</Form.Label>
    <Form.Control type="number" placeholder="Mecze" onChange={(e) =>{
        setMatch((e.target.value))}}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
	  <Form.Label>Wybierz Lige</Form.Label>
       <Form.Select aria-label="Default select example" onChange={(e) =>{
        setLeagueSelected((e.target.value))
        }}>
          {Array.from(displayLeague).map((val,key)=>{
      return(
          <option>{val.Nazwa_ligi}</option>
      )
      
    })}
      <option></option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Punkty</Form.Label>
    <Form.Control type="number" placeholder="Punkty" onChange={(e) =>{
        setScore((e.target.value))}}/>
  </Form.Group>
      <Form.Group>
      <Form.Label>Opis Drużyny</Form.Label>
      <Form.Control as="textarea" placeholder='Treść' className='mb-3' onChange={(e) =>{
        setSlug((e.target.value))}}></Form.Control>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3 mt-3 col-sm-6">
        <Form.Label>Wybierz Logo</Form.Label>
        <Form.Control type="file" name="upload_file" onChange={handleInputChange}
        />
      </Form.Group>
      <div className='text-center'>
  <Button variant="primary" type="submit" className='col-lg-4 col-12' onClick={TeamAdd}>
   Dodaj
  </Button>
    </div>
  </Form>
  <Card className='col-lg-6 col-sm-12 mx-auto mt-5'>
  <Card.Header className='text-center'>Wszystkie drużyny</Card.Header>
  <ListGroup variant="flush">
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Nazwa Druzyny</th>
        <th>Mecze</th>
        <th>Punkty</th>
        <th>Liga</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {Array.from(teamDisplay).map((val,key)=>{
      return(
      <tr> 
        <td>{val.id}</td>
        <td>{val.Druzyna}</td>
        <td>{val.Mecze}</td>
        <td>{val.Punkty}</td>
        <td>{val.Liga}</td>
        <td><Button variant='danger' onClick={()=>{DelateTeam(val.id ,val.image)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
      </tr>
      )
     })}
    </tbody>
  </Table>
  </ListGroup>
</Card>
  
  </Container></div>

  )
}

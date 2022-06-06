import {useEffect , useState} from 'react'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import { useHistory} from 'react-router-dom';

export default function Home() {
  
        const [post ,setPost] = useState([])
        let history = useHistory()
    
        useEffect(()=>{
            Axios.get("http://localhost:4000/Blog").then((data)=>{
                setPost(data.data)
            })
           },[])   


  return (
        <div className='col-lg-8'>
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>

        </div>
  )
}

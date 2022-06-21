import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Form , Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo-dark.png'
const Login = () => {
    const [body, setBody] = useState({ username: '', password: '' })
    const { push } = useHistory()
    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post('http://localhost:4000/api/login', body)
            .then(({ data }) => {
                localStorage.setItem('auth', '"yes"')
                push("/app")
                
            })
            .catch(({ response }) => {
                console.log(response.data)
            })
       
    }
    return (
        <div>
            <div className='text-center mt-5'><img src={logo} width="100" height="100"></img></div>
            <Form className='col-lg-3 col-md-6 mt-5 p-4 mx-auto border rounded'>
                <h1>Admin</h1>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Użytkownik</Form.Label>
    	<Form.Control 
		 type="email" 
		 label='Użytkownik'
                 value={body.username}
                 onChange={inputChange}
                   name='username' />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formPlaintextPassword">
    <Form.Label>Hasło</Form.Label>
    <Form.Control 
	 type="password" 
	  label='Hasło'
          value={body.password}
 	  onChange={inputChange} 
       name='password' />
  </Form.Group>
  <Button onClick={onSubmit} variant="danger">Zaloguj</Button>
</Form>

        </div>
    )
}

export default Login
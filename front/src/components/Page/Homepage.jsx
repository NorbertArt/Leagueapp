import {useState ,useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavSection from '../views/navbar'
import Home from '../views/home'
import Style from '../views/style.css'
const Homepage= () => {
   
    return (
            
        <div>
            <NavSection/>
           <div className='container text-center'>
           <h1 className='Nag'>Strona główna</h1>
           <Home/>
           </div>
        </div>
    )
}

export default Homepage

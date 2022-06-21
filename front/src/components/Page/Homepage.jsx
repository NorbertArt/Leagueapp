import 'bootstrap/dist/css/bootstrap.min.css';
import NavSection from '../views/navbar'
import Home from '../views/home'
import Style from '../views/style.css'
import Logo2 from '../views/img/logo2.png'
import Footer from '../views/footer'
const Homepage= () => {
   
    return (
            
        <div>
            <NavSection/>
           <div className='container text-center'>
           <img className='img-fluid mt-4 mb-4' src={Logo2}></img>
           <Home/>
           
           </div>
           <div className='mt-5'>
           <Footer/>
           </div>
        </div>
    )
}

export default Homepage

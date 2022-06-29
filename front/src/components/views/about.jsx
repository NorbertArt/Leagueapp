
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import NavSection from './navbar'
import Logo from './img/onas.jpg';
import Onas from './img/onas2.jpg';
import { Button  , Carousel} from 'react-bootstrap';

const About= () => {

    return (
            
        <div>
            <NavSection/>
            
           <div className='container'>
           
           <div className='row'>        
           <div className='border-bottom row'>
            <div className='col-sm-6 text-center mt-5 mb-5'>
            <h1 className='display-1 mt-5'>O nas</h1>
                <span className='text-muted'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis sodales risus mollis bibendum et quis tortor. Donec fermentum Nunc vitae turpis sodales risus mollis bibendum et quis tortor. Donec fermentum </span>

               <p className='mt-4'>Kontakt do admina: <span className='text-danger'>Limanowskasuperliga@gmail.com</span></p>
            </div>
            <div className='col-sm-6 text-center mt-5 mb-3'>
                <img className='rounded mb-5' src={Onas}></img>
            </div>
            </div>
            <div className='mx-auto row col-sm-12 mt-5'>
              <div className='col-sm-6'><img className='text-center img-fluid' src={Logo} alt=""/></div>
              <div className='col-sm-6 pt-5'>
                <h1 className='mt-5 mb-5 display-2'>Główny patron</h1>
                <p><span className='text-danger'>Weszło</span> – portal internetowy założony w 2008 przez Krzysztofa Stanowskiego. Na początku zajmował się głównie piłką nożną, z czasem poszerzając się o inne dyscypliny. Obecnie grupa medialna</p>
                    <Button variant='danger'>Facebook</Button>
            </div>
            </div>
              
        </div>
        <div className='col-sm-8 mx-auto mt-5'>
           
        </div>
           </div>
           
           
           <br></br>
           <Footer/>
        </div>
    )
}

export default About
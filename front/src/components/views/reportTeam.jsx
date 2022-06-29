import React from 'react'
import { Container } from 'react-bootstrap';
import NavSection from './navbar';
import Logo from './img/logo-dark.png';
import Footer from './footer';
export default function ReportTeam() {
  return (
    <div>
        <NavSection/>
        <Container>
       
        <div className='row'>
            
            <div className='col-sm-8 text-center mx-auto mt-5'>
            <img className='mx-auto mb-3' src={Logo} width="100" height="100"></img>
                <h1>Jakie informację wysłać adminowi?</h1>
              
                <span className='text-muted'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis sodales risus mollis bibendum et quis tortor. Donec fermentum pretium hendrerit. Curabitur sodales nibh et ex pretium porta. Nullam consectetur sapien tortor, eget auctor mi porta sit amet. Donec tempus metus sapien, a viverra massa ullamcorper eget. Fusce feugiat risus eros, vehicula semper arcu mattis non. Pellentesque interdum, lorem vitae aliquet iaculis, tellus ipsum mattis diam, in vehicula nisi dui et elit. Sed dictum sem nec tristique rutrum.</span>
            </div>
        </div>
        <div className='col-sm-8 mx-auto'>
            <h1 className='text-center mt-5'>Kontakt</h1>
            <p className='text-muted text-center'>Kontakt do admina: <span className='text-danger'>Limanowskasuperliga@gmail.com</span></p>
            <p className='text-center text-muted'>Aenean dignissim ac turpis eget porta. Etiam vulputate enim vitae magna consectetur, in eleifend ex rutrum. Maecenas interdum eros sed aliquet suscipit. Ut in lectus eu lectus fermentum maximus sed in felis. Pellentesque auctor tellus sit amet purus iaculis</p>
        </div>
        
        
        </Container>
        <Footer/>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-scroll';

const NavBarTwo = () => {
  return (
     
    <div className='container-fluid navbar-two'>
    <div>
      <button><Link activeClass="active" to="stock" spy={true} smooth={true} offset={50} duration={500}  className='hover-animation'>CURRENT STATE</Link></button>  
      <button><Link activeClass="active" to="action" spy={true} smooth={true} offset={50} duration={500}  className='hover-animation'>ACTION</Link></button>  
      <button><Link activeClass="active" to="our" spy={true} smooth={true} offset={50} duration={500}  className='hover-animation'>OUR PRODUCT</Link></button>  
      <button><Link activeClass="active" to="info" spy={true} smooth={true} offset={50} duration={500}  className='hover-animation'>INFROMATION</Link></button>  
   </div> 
</div>
  )
}

export default NavBarTwo
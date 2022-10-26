import img_1 from '../photo/2.jpeg'
import img_2 from '../photo/1.webp'
import img_3 from '../photo/3.png'
import React from 'react';
import { Link } from 'react-scroll';

function Header() {
  return (
   <div className='container-fluid info'>
    <div className='header-text'> 
      <h2>Tehno Shop BiH</h2>
      <p>Tehno.com online shop was created as an idea of a long-standing successful business. Tehno.com has a long tradition and excellent references when it comes to dealing with technology and mobile phones. We have been successfully operating, developing and continuously innovating on the market for 5 years.</p>
   <button className='tehno_shop_btn'><Link activeClass="active" to="stock" spy={true} smooth={true} offset={50} duration={500}  className='hover-animation'>SHOP NOW</Link></button>
    </div>
    <div className='header-image'>
      <img className='img_one' alt='img' src={img_1}/>
      <img alt='img' className='img_two' src={img_2}/>
    </div>
   </div>
  );
}

export default Header;
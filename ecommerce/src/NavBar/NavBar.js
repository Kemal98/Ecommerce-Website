import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../photo/logo5.png'
import {Icon} from 'react-icons-kit'
import anmitonCart from './BasketAnimation.gif'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import Form from 'react-bootstrap/Form';

const NavBar = ({user, uuid, totalQty, totalProduct, totalPrice}) => {
const navigate = useNavigate()

  const handleLogout = () => {
     auth.signOut().then(()=> {
         navigate({ pathname: '/login' })
     })
  }

  return (
    <nav>
       <div className='nav-center'>
            <div className='nav-header'>
                <img src={logo} alt=""/>
             </div>
            {!user && <div className='links linksMob'>

                <span><Link to="/signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="/login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='links_login'>
                {user === 'Admin' ? (
                  <div className='links_'>
                    <span><Link to="/order-products">Order Products</Link></span>
                   <span><Link to="/admin">Support Chat</Link></span>
                    <span><Link to="/add-products" className='navlink'>Add-Products</Link></span>
                   {/* <span><Link to="/" className='navlink'>Home</Link></span> */}
                  <span><Link to="/cart" disabled={uuid} className='navlink'> <img src={anmitonCart} width={"50px"}  alt="animationCart"/></Link></span>
                 <div>
                 <div className="navigation">
                   <a className="button" onClick={handleLogout} href="">
                 <img className='img_' src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg" alt="product-img"/>
             <div className="logout">LOGOUT</div>
            	</a>
           </div>                 
           </div>  
         </div>
                  ): (
                    <>
                <span><Link to="/" className='navlink'>Home</Link></span>
                <span><Link to="/cart" disabled={uuid} className='navlink'> <img src={anmitonCart} width={"45px"}  alt="animationCart"/></Link></span>
                 {totalProduct > 0 ? <span  className='cart-indicator'>{totalProduct}</span> : ''} 
                   <span className='amount'>
                   <span className='price-label'>Your basket</span>
                  {totalPrice? '$'+totalPrice: ''}
                  </span>
                <div className="navigation">
	                <a className="button" onClick={handleLogout} href="">
                  <img className='img_' src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg" alt="product-img"/>
                  <div className="logout">LOGOUT</div>
            	</a>
           </div>
                 </> 
                 )}
            </div>}
           
      </div>
    </nav>
  )
}

export default NavBar
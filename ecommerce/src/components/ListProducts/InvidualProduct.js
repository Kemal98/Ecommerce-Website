import React, { useState } from 'react'
// import '../App.css'
import { auth, fs } from '../../Config/Config';

const InvidualProduct = ({product, addToCart, user, alertCart}) => {
  

  const handleAddToCart = () => {
    addToCart(product)
  }
  const handleRemoveCart = () => {
    auth.onAuthStateChanged(user => {
        if(user) {
           fs.collection('Products').doc(product.ID).delete().then(()=> {
            console.log('Product is remove!')
           })      
          }
        else {
             console.log('User is not logged in to increment')
        }
      })
    }
    return (
      <div className='product' style={{width:"20c"}}>
            <div className='product-img'>
                <img src={product.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{product.title}</div>
            <div className='product-text description'>{product.description}</div>
            <div className='product-text priceBefore'> {product.priceBefore}$</div>
            <div className='product-text price'> {product.price}$</div>
            {user === 'Admin' ? ( <button className='btne_delete_prodcut' onClick={handleRemoveCart}>REMOVE CART</button> 
         ) : <button className='btne_add_prodcut'  onClick={handleAddToCart}>ADD TO CART</button>}
        </div> 
  )
}

export default InvidualProduct
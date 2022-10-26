import React from 'react'
import NavBar from '../../NavBar/NavBar'
import { useState,useEffect } from 'react'
import { auth, fs } from '../../Config/Config';
import CartProducts from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import TopBar from '../TopBar';
import './MyBasket.css'
import ChatBox from '../../SupportChat/ChatBox/ChatBox';
import ModalDelivery from './ModalDelivery';
const MyBasket = () => {
  
    const GetCurrentUser = () => {
        const [user,setUser] = useState(null)
         useEffect(()=> {
          auth.onAuthStateChanged(user => {
            if(user) {
             fs.collection('users').doc(user.uid).get().then(snapshot => {
              setUser(snapshot.data().fullName);
             }) 
            }
            else {
              setUser(null)
            }
          })
        }, [])
        return user;
      };
    
      const user = GetCurrentUser();
      console.log(user)
      const [cartProducts, setCartProducts] = useState([])
   
      useState(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
               fs.collection('Cart' + user.uid).onSnapshot(snapshot => {
                const newCartProduct = snapshot.docs.map((doc) => ({
                    ID:doc.id,
                    ...doc.data() 
                }))
                setCartProducts(newCartProduct)
               })
            }
            else {
                console.log('user is not signed in')
            }
        })
     })

     let Product;

     const cartProductIncrease = (cartProduct) => {
      Product=cartProduct;
      Product.qty=Product.qty+1
      Product.TotalProductPrice=Product.qty*Product.price

      auth.onAuthStateChanged(user => {
        if(user) {
            fs.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
              console.log('Kolicina povecana za 1')
            })
        }else {
           console.log('User is not logged in to increment')
        }
      })
     }


     const cartProductDecrease = (cartProduct) => {
      Product=cartProduct;
      if(Product.qty > 1) {
      Product.qty=Product.qty-1 
      Product.TotalProductPrice=Product.qty*Product.price

      auth.onAuthStateChanged(user => {
        if(user) {
            fs.collection('Cart' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
              console.log('Kolicina povecana za smanjena za 1')
            })
        }else {
           console.log('User is not logged in to increment')
        }
      })
    }
  }

  
const qty = cartProducts.map(cartProcut => {
  return cartProcut.qty
})


const totalQty = qty.reduce((previousValue, currentValue) => previousValue + currentValue,0
);



const price = cartProducts.map(cartProcut => {
  return cartProcut.TotalProductPrice
})
const totalPrice = price.reduce((previousValue, currentValue) => previousValue + currentValue,0
);



const [totalProduct, setTotalProduct]= useState(0);
console.log(totalProduct)
useEffect(() =>{
 auth.onAuthStateChanged(user => {
   if(user){
     fs.collection('Cart' + user.uid).onSnapshot(snapshot => {
       const qty = snapshot.docs.length
       setTotalProduct(qty)
     })
     }
   })
 }, [])

const handleToken = (token) => {
  console.log(token)
}


// Modal Delivery


const [showModal, setShowModal] = useState(false)

const triggerModal = () => {
  setShowModal(true)
}

const hideModal = () => {
  setShowModal(false)
}


  return (
    <>
     <TopBar/>
    <NavBar user={user} totalProduct={totalProduct} totalPrice={totalPrice} />           
    <br></br>
    <div className='container basket_my' >
    <h2 className='text-center'>Products in my cart</h2>
    {cartProducts.length > 0 && (
      <div className='container cart__'>
          <div className='row row-cols-1 row-cols-md-4 g-4'>
                 <CartProducts cartProducts={cartProducts}
                cartProductIncrease={cartProductIncrease}  cartProductDecrease={cartProductDecrease}/>
            </div>
            <div className='summary-box_'>
              <div className='infoDeliveryProducts'>
              <div className='totalProductDelivery'>
                <h5>Cart Summary</h5>
                        <div>
                        <strong>Total No of Products:</strong><span>{totalQty}</span>
                        </div>
                        <hr className="hr-1"/>

                        <div>
                        <strong>Total Price to Pay: </strong><span>$ {totalPrice}</span>
                        </div>
                        <hr className="hr-1"/>

                </div>
                
                  <div className='deliveryScroll'> 
                          {
                              cartProducts.map((product)=>(
                                <div className='detailsDelivery'>
                                  <h5> {product.title}</h5>
                                  <span><strong>Description:</strong> {product.description}</span>
                                  <span><strong>Price: </strong>{product.price}$</span>
                                  {/* <div className='product-img'>
                                  <img src={product.url} alt="product-img"/>
                                  </div> */}
                                  </div>
                          ))
                          }
                          </div>
                          </div>   
                        {/* <StripeCheckout
                          stripeKey='pk_test_51Lep5HECyIUaSUMIe38ESBWpOrIsEIIiXV683z5ijfXMjgadDIibpunoYJKBNg15Lz8DV6W7aQltTIfqkJTAB3F3005BOFOBMR'
                          token={handleToken}
                          billingAddress
                          shippingAddress
                          name='All Products'
                          amount={totalPrice * 100}
                        >
                        </StripeCheckout> */}
                        {/* <button className='btn btn-secondary btn-md'>Cash on Delivery</button>                                                                                                                                              */}
                      <div className='cashOnDelivery'>
                         <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>
                        <button className='cashBtn' 
                        onClick={()=>triggerModal()}>Cash on Delivery</button>    
                      </div>
           
                   </div> 
                 </div>
    )}
    {cartProducts.length < 1 && (
    <div className='container-fluid'>No products to show</div>
    ) }  
    </div>      

    {showModal === true && <ModalDelivery cartProducts={cartProducts} hideModal={hideModal} TotalPrice={totalPrice} totalQty={totalQty}/>}   
</>
  )
}

export default MyBasket
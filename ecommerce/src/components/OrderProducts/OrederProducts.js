import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./infoBuyer.css"
import logo from "./logo5.png"
import { fs, auth } from '../../Config/Config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const OrederProducts = () => {
 const navigate = useNavigate();
  

  const [buyer, setBuyer] = useState([]);
console.log(buyer)  
  
  const getBuyer = async () => {
    const buyer = await fs.collection('Buyer-Personal-Info').get()
    const buyerArray = []
    for(const snap of buyer.docs) {
     const data = snap.data();
     data.ID = snap.id
     buyerArray.push({
       ...data
     })
 
     if(buyerArray.length === buyer.docs.length) {
       setBuyer(buyerArray)
      
     }
    }
   }
  useEffect(() => {
   getBuyer();
  },[])
 


  const deliveryCompleted = (product) => {
    console.log(product)
        fs.collection('Buyer-Personal-Info').doc(product).delete().then(()=> {
            console.log('The product has been shipped !')
           })  
          setTimeout(() => {
            toast.success('The product has been shipped', {
             position: 'top-right',
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: false,
             draggable: false,
             progress: undefined,
           });
          }, 3000);
           navigate("/")
         
      }
     


 


  return (
    <div className="buyerInfoAdmin">
    <nav>
        <div className="nav_admin">
          <div className="img_logo_">
          <img src={logo}/>
          </div>
         <h2>SEND THE PRODUCT</h2>
       <span><Link to="/">Home</Link></span>
        </div>
      </nav>

        {buyer < 1 && <div className='noProductOrder'>
          <h2>No products oreder</h2>
          </div>  }
      <div className='productOrder'>
        <div className='listOrder'>
        {buyer.map((info) => (
          <div key={info.ID} className='buyerInfo'>
          
          <div className='scrollProduct'>
          {info.productDetails.map((info) => (
             <div className='product_info_all'>
              {/* <hr className='hr-1'/> */}
              <h5>{info.title}</h5>
              <div>
              <div className='productEdit'><strong>Description:</strong> <span>{info.description}</span></div>
              <div className='productEdit'><strong>Price:</strong> <span>{info.price}$</span></div>
              <div className='productEdit'><strong>Category:</strong> <span>{info.category}</span></div>
              </div>
             
             </div>
          ))}
             </div>
          <h5></h5>
         <div className='infoNamePrice'>
            <span>QUATITY: {info.CartQty}</span> 
            <span>PRICE: {info.CartPrice}$</span>
          </div>
          <hr className="hr-1"/>
          <h4>Delivery info</h4>
          <div className='info_'>
          <div className='infoBuyerDeatils'>
          <span>Name</span>
          {info.Name}
          </div>
          <div className='infoBuyerDeatils'>
          <span>ADRESS</span>
           {info.ResidentialAddress}
           </div>
          <div className='infoBuyerDeatils'>
          <span>CellNo</span>
          {info.CellNo}
          </div>
          <div className='infoBuyerDeatils'>
          <span>EMAIL</span>
          {info.Email}
          </div>
          </div>
          <hr className="hr-1"/>
         
          <div className='buyerButton'>
            <button onClick={() => deliveryCompleted(info.ID)}>Delivery completed</button>
            {/* <button>Out of stock</button> */}
          </div>

          </div>
         
    ))}
        </div>

      </div>
    </div>
  )
}

export default OrederProducts
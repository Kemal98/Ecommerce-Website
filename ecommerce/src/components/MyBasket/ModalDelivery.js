import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fs, auth } from '../../Config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure();

const ModalDelivery = ({totalQty, TotalPrice, hideModal, cartProducts}) => {

    const navigate = useNavigate();
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);
    const [cartQty]=useState(totalQty);
    const [nameProduct] = useState()

     console.log(cartProducts)
    const handleCloseModal = () => {
        hideModal()
    }


    const handleCashOnDelivery = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;

        const userData = await fs.collection('users').doc(uid).get();
        console.log(userData)
      
        //  date
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const d = new Date();
        const day = days[d.getDay()];
 

        await fs.collection('Buyer-Personal-Info').add({
            Name: userData.data().fullName,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty,
            productDetails:cartProducts,
        })

      const cartData = await fs.collection('Cart' + uid).get();
      console.log(cartData)
        for(var snap of cartData.docs){
            var data = snap.data();
            console.log(data)
            data.ID = snap.id;
            await fs.collection('Buyer-Cart' + uid).add(data);
            await fs.collection('Cart' + uid).doc(snap.id).delete();
        }
      hideModal()
      navigate('/')
      toast.success('Your order has been placed successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } 


  return (
    <div className='shade-area'>
        <div className='modal-container'>
            <form className='form-group' onSubmit={handleCashOnDelivery}>                   
                <input type="number" className='form-control' placeholder='Cell No'
                    required onChange={(e)=>setCell(e.target.value)} value={cell}                        
                />
                <br></br>
                <input type="text" className='form-control' placeholder='Residential Address'
                    required onChange={(e)=>setResidentialAddress(e.target.value)}
                    value={residentialAddress}
                />
                <br></br>
                <label>Total Quantity</label>
                <input type="text" className='form-control' readOnly
                    required value={cartQty}
                />
                <br></br>
                <label>Total Price</label>
                <input type="text" className='form-control' readOnly
                    required value={cartPrice + "$"}
                />
                <br></br>
                <button type='submit' className='btn btn-success btn-md'>Submit</button>
            </form>
            <div className='delete-icon' onClick={handleCloseModal}>x</div>
        </div>
    </div>
  )
}

export default ModalDelivery
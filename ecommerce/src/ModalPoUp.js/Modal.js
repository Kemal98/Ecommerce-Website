import React from 'react'
import './modal.css';
import {x} from 'react-icons-kit/iconic/x'
import {Icon} from 'react-icons-kit'

const Modal = ({toggle, closeModal}) => {
    console.log(toggle)
  return (
    <div className={`${toggle ? 'container_modal_acitve' : 'container_modal'}`}>  
        <div className='modal-edit'>
            <h2>HOW TO BUY THE PRODUCT</h2>
            <ol>
              <li>All you have to do is find the product you want to choose and after getting its details and features decide to buy, click on the cart icon.</li>
               <li>After you have put the item in your basket, click on "Basket in the upper corner", and a list of the items you have chosen will open. All you have to do is press “Next step”.</li>
              <li>In case you do not have a registered account, it is enough to fill out the registration form.</li>
              <li>If we have the desired product in stock, it will be shipped within 24 to 48 hours to your address.</li>
               <li>You can place the order directly on the phone numbers: 033 841 841 or 061 317 614.</li>
           </ol> 

            <div onClick={closeModal} className='close-btn'><Icon icon={x} size={22}/></div>
        </div>
    </div>
  )
}

export default Modal
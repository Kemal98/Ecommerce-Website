import React from 'react'
import './modal.css';
import {x} from 'react-icons-kit/iconic/x'
import {Icon} from 'react-icons-kit'

const ModalOthers = ({modalOthers, closeOthers}) => {
  return (
    <div className={`${modalOthers ? 'modal_others_acitve' : 'modal_others'}`}>
        <div className='modal-edit'>
        <h2>DELIVERY</h2>
        <ul className='modal-ul'>
            <li>
             
            Theno.com makes door-to-door delivery to customers' home addresses
             throughout Bosnia and Herzegovina for all orders in cooperation with 
             the courier service (A2B Express - contact: +387 33323 2323). All goods
              (provided they are in stock) that are ordered by 5pm every working day,
               will be delivered within 24 to 48 hours to the customer's address. Our staff 
               will contact you by phone before shipping. If the goods are not in stock, 
               colleagues from the delivery service will enter your information and contact
                you when the ordered item is available. The delivery office is open every day
                 except weekends, from 10 a.m. to 5:30 p.m.

              FREE number for orders: 02323244
            </li>
        </ul>
        <div onClick={closeOthers} className='close-btn'><Icon icon={x} size={22}/></div>
        </div>
    </div>
  )
}

export default ModalOthers
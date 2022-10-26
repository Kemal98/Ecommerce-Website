import React from 'react'
import './modal.css';
import {x} from 'react-icons-kit/iconic/x'
import {Icon} from 'react-icons-kit'


const ModalSingUp = ({toggle, closeModal}) => {
    
  return (
    <div className={`${toggle ? 'modal_others_acitve_' : 'modal_others'}`}>
    <div className='modal-edit'>
    <h2>HOW TO REGISTER</h2>
    <ul className='modal-ul'>
        <li>
        Create your tehnoshoop.com account and take advantage of shopping for our customers.
        </li>
        <li>Enter your full name, your valid email and password.</li>
        <li>Your personal/personal information will be used to improve the experience of using our website, to access your account and other things as stated in our privacy policy.</li>
    </ul>
    <div onClick={closeModal} className='close-btn'><Icon icon={x} size={22}/></div>
    </div>
</div>
  )
}

export default ModalSingUp
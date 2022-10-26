import React, { useState } from 'react'
import ModalSend from './ModalSend'
import './send.css'
const EmailSend = ({user, socket}) => {
  const [toggle,setToggle] = useState(false)
  
  const onHandlerClick = () => {
    setToggle(true)
  } 
  const closeOthers = () => {
    setToggle(false)
    
  }

  console.log(user)
  return (
    <>    
       <div className='send-message'>
    <ModalSend closeOthers={closeOthers} user={user} toggle={toggle} socket={socket}/>

       <button onClick={onHandlerClick} class="icon-btn add-btn">
        <div class="add-icon"></div>
         <div class="btn-txt">Send Message</div>
         </button>
       </div>
    </>

  )
}

export default EmailSend
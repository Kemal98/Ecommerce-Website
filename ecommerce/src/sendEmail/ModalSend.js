import React, { useEffect, useRef, useState } from 'react'
import {x} from 'react-icons-kit/iconic/x'
import {Icon} from 'react-icons-kit'
import './send.css'
import imageEmail from "./email2.gif"
import imageChat from "./Message2.gif"

import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import ChatBox from '../SupportChat/ChatBox/ChatBox';
import EmailSend from './EmailSend';
import EmailSendMessage from './EmailSendMessage';


const ModalSend = ({toggle,closeOthers, user, socket}) => {
 
  
  const [emailChat, setEmailChat] = useState(null)

  const supportChat = () => {
     setEmailChat(1)
     setIsOpen(true)
  }

  const emailSend = () => {
    setEmailChat(2)
    setIsOpen(false)
  }

  const [isOpen, setIsOpen] = useState(true)
  
  useEffect(() => {
    if(closeOthers) {
      setEmailChat(null)
    }

  }, [closeOthers])

  return (
  <>
   {toggle ? (
     <div className='container_modal_acitve_card animate__animated animate__backInUp'>
      <div onClick={closeOthers} className='close-btne'><Icon icon={x} size={22}/></div>
        {emailChat === 1 && <ChatBox sockett={socket} isOpen={isOpen} userr={user}/>}      
        {emailChat === 2 && <EmailSendMessage />}      
        {/* {emailChat === 3 && <ChatBox/>}  */}
<div className="container_button">
  <div className='container_message'>
      <div className='btn_image' onClick={emailSend}>
            <img alt='emailSend' src={imageEmail}/>
            <span>Email Send</span>
      </div>
    </div>
    
     <div className='container_message'>
      <div className='btn_image' onClick={supportChat}>
      <img alt='supportChat' src={imageChat}/>
      <span>Chat Support</span>
      </div>
     </div>
   </div>
</div>
    
)
   : ''}
   </>
  
  )
}

export default ModalSend




// const ModalSend = (closeOthers, toggle) => {  

//   const [emailChat, setEmailChat] = useState(false)

//   const supportChat = () => {
//      setEmailChat(false)
//   }

//   const emailSend = () => {
//     setEmailChat(true)

//   }

//   console.log(toggle)

//   return (
//   <>
//    {toggle ? (
//      <div className='container_modal_acitve_card animate__animated animate__backInUp'>
//        <div onClick={closeOthers} className='close-btne'><Icon icon={x} size={22}/></div>
//           <div className='card-position'>
//            <div className="card_">
       
//     {/* {emailChat ?  <ChatBox/> : <EmailSend/>}       */}
//    </div>
//    </div>
//     <div>
//       <button onClick={supportChat}>Support Chat</button>
//       <br/>
//       <button onClick={emailSend}>Email Send</button>
//     </div>
//    </div>
// )
//    : ''}
//    </>
  
//   )
// }

// export default ModalSend
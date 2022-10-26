import React, { useRef, useState } from 'react'
import {x} from 'react-icons-kit/iconic/x'
import {Icon} from 'react-icons-kit'
import './send.css'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';

const EmailSendMessage = () => {
    
   const [valueMessage, setValueMessage] = useState('')
   const [valueEmail, setValueEmail] = useState('');

  function sendEmail(e) {
    e.preventDefault()
    if(!valueEmail && !valueMessage) {
      alert('No value message and email!')
    }else {
    const Data = {
      email:valueEmail,
      message:valueMessage
    }
    const Service_id =  'service_gahjgop'
    const Template_id = 'template_qa4fzpz'
    const user_id = 'ipRc1wAEm2ZK2FXA9'
    emailjs.send(Service_id,Template_id,Data,user_id).then(
      function(response) {
        toast.success(' msg send succesfully!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setValueMessage('')
        setValueEmail('')
      },
      function(error) {
        console.log(error)
      }
    )
   }
  }
  return (
<>
<div className='messagePosition'>

<h1 className="card__title">Send a message</h1>
{/* <p className="card__content">If you have any doubts regarding the purchase of products, send us an email.
</p> */}
<hr/>
<div className="card__form">
<div className='card-position'>
        <div className="card_">
  <input value={valueEmail} onChange={(e) => setValueEmail(e.target.value)} type="email" className="form-control" placeholder="Email Address" name="email"/>
  <textarea value={valueMessage} onChange={(e) => setValueMessage(e.target.value)} type="text" className="form-control" placeholder="message" name="message"/>
      <button onClick={sendEmail} className='send-btn'>
       <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
    </svg>
  </div>
 </div>
   <span>Send a Message</span>
</button>  
</div>
</div>
 </div>
 </div>

</>
  )
}

export default EmailSendMessage
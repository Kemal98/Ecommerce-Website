import React, { useState,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, fs } from '../../Config/Config';
import ModalSingUp from '../../ModalPoUp.js/ModalSingUp';
import './LoginSubmitAnimation.css'

const SignUp = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('')

    const handlerSignup = (e) => {

      e.preventDefault();


      auth.createUserWithEmailAndPassword(email, password)
      .then((creditinials) => {
          fs.collection('users').doc(creditinials.user.uid).set( {
            fullName:fullName,
            Email:email,
            Password:password
          }).then(() => {
            setSuccessMsg('Signup Succesfull.You will now get automaticily redicerted to login')
            setTimeout(() => {
            navigate({ pathname: '/login' }) // instead of navigate.push
            }, 3000);
            
          }).catch((error) =>setErrorMsg(error.message))
        })
        .catch((error) => {
          setErrorMsg(error.message)
        });
    }

    const [modalState, setModalState] = useState(false);

    const openModal = () => {
      setModalState(!modalState)
    }
    
    const closeModal = () => {
      setModalState(false)
    }


  return (
    <div className="area">
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    <div className='container_'>
      <br></br>
      <br></br>
      <div className='signUpContainer'>
      <h1>Sign Up</h1>

      <span onClick={openModal} className='howRegister'>HOW TO REGISTER</span>
      <ModalSingUp toggle={modalState} closeModal={closeModal}/>
      {successMsg && <>
      <div className='success-msg'>{successMsg}</div>
      <br></br>
      </>}
      <form className='form-group' autoComplete='off' onSubmit={handlerSignup}>
        <label>Full Name</label>
        <input type='text' className='form-control' required
         onChange={(e) => setFullName(e.target.value)} value={fullName} />
        <br></br>
        <label>Email</label>
        <input type='email' className='form-control' required
          onChange={(e) => setEmail(e.target.value)} value={email}/>
        <br></br>
        <label>Password</label>
        <input type='password' className='form-control' required
        onChange={(e) => setPassword(e.target.value)} value={password}/>
        <br></br>
        <div className='btn-box'>
         
              <span>Alredy have an account Login
           <Link to='/login'>  Here</Link></span>
      <button type='submit' className='btn btn-md'>Sign Up</button>
      <span><Link to='/'> Return me to the home page</Link></span>  
        </div>
      </form>
      {errorMsg && <>
     <div className='error-msg'>{errorMsg}</div>
    </>}

  </div>
    </div>
    </div>
  )
}

export default SignUp
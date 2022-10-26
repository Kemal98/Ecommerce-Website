import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSubmitAnimation.css'
import PoUp from '../PoUp';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('')

  const hanldeLogin = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setSuccessMsg('Login Succesfull')
      // setEmail('')
      // setPassword('')
      // setErrorMsg('')
      toast.success(' User successfully logged in!', {
        position: "top-center",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setTimeout(() => {
      navigate({ pathname: '/' }) 
      }, 3000)
    }).catch(error => setErrorMsg(error.message));
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
    <div style={{marginTop:"7rem"}} className='container_'>
    
    <ToastContainer/>
    <h1>Login</h1>
    <form className='form-group' autoComplete='off' onSubmit={hanldeLogin}>
      <label>Email</label>
      <input type='email' className='form-control' required
      onChange={(e) => setEmail(e.target.value)} value={email}
      />
      <br></br>
      <label>Password</label>
      <input type='password' className='form-control' required
      onChange={(e) => setPassword(e.target.value)} value={password}
      />
      <br></br>
      <div className='btn-box'>
         <span>I don't have an account, register
         <Link to='/signup' className='link'> Here</Link></span>
         <button type='submit' className='btn  btn-md'>Login</button>
         <span><Link to='/'> Return me to the home page</Link></span>  
         <>
         </>
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

export default Login
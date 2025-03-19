import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import {signup,login} from '../../config/firebase.config'

const Login = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === 'Sign Up') {
      signup(username,email,password);
    }else{
      login(email,password);
    }
  }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="logo" className='logo' />
      <form onSubmit={onSubmitHandler} className='login_form'>
        <h2>{currState}</h2>
         {currState === 'Sign Up'? <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' placeholder='Username' className='form-input' required /> :null} 
        <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' className='form-input' required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='form-input' required />
        <button type='submit' className='form-button'>{currState === 'Sign Up' ? 'Create Account' : 'Login Now'}</button>
        <div className="login-terms">
          <input type='checkbox'/>
          <p>Agree to terms and conditions</p>
        </div>
        <div className="login-forgot">
          {
            currState === 'Sign Up'? <p className='login-toggle'>Already have an account?<span onClick={() => setCurrState('Login')}> Click here</span> </p>
            :  <p className='login-toggle'>Create Account<span onClick={() => setCurrState('Sign Up')}> Click here</span> </p>
          }
        </div>
      </form>
    </div>
  )
}

export default Login
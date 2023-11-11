import React, { useState } from 'react'
import Input from '../../Components/Common/Input'
import Button from '../../Components/Common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import ForgotPassword from '../../Components/ForgotPassword';
import Loader from '../../Components/Common/Loader';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [show, setShow] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  async function loginHandle() {
    if (credentials.email === '' || credentials.password === '') {
      toast.warn('Please fill up the credentials!');
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      toast.success("You're Logged-in!");
      navigate('/dashboard');
      setIsLoading(false);
    }
    catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {
        isLoading ?
          <Loader />
          :
          <div className='signup-form' style={{ marginTop: '5rem' }}>
            <h1>Login</h1>

            <Input type={'email'} value={credentials.email} setValue={(e) => { setCredentials({ ...credentials, email: e }) }} placeholder={'user@e-mail.com'} required={true} />

            <Input type={show ? 'text' : 'password'} value={credentials.password} setValue={(e) => { setCredentials({ ...credentials, password: e }) }} placeholder={'Password'} required={true} show={show} toogle={setShow} />

            <Button text={'Login'} clickHandle={loginHandle} stretched={true} color={'rgb(6, 29, 129)'} />

            <p>Don't have an account? <Link to={'/signup'} >Create an account</Link></p>
            <p className='forgotPassLink' onClick={() => { setResetPass(true) }} >Forgot Password?</p>

            {
              resetPass && <ForgotPassword setDisplayModal={setResetPass} />
            }
          </div>
      }
    </>
  )
}

export default Login
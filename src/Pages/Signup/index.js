import React, { useState } from 'react';
import Input from '../../Components/Common/Input';
import Button from '../../Components/Common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, setDoc } from "firebase/firestore";
import Loader from '../../Components/Common/Loader';


function Signup() {
  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateMail = (mail) => {
    // regex to validate mail id --- 
    const validMail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]*$/;
    return validMail.test(mail);
  }

  async function submitHandler() {
    if (details.username === '' || details.email === '' || details.password === '' || details.confirmPass === '') {
      toast.warn('Please fill up all fields!');
      return;
    }
    if (!validateMail(details.email)) {
      toast.warn('Please enter a valid mail!');
      return;
    }
    if (details.password.length < 8) {
      toast.warn('Password is too weak!');
      return;
    }
    if (details.password !== details.confirmPass) {
      toast.warn("Passwords doesn't match!");
      return;
    }
    try {
      setIsLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, details.email, details.password);
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: details.username,
        email: user.email,
        uid: user.uid
      })

      await updateProfile(user, { displayName: details.username.toString() });

      toast.success("You're signed-up!");

      navigate('/dashboard');
    }
    catch (error) {
      toast.error(error?.message)
      setIsLoading(false);
    }
  }

  return (
    <>
      {
        isLoading ?
          <Loader />
          :
          <div className='signup-form' style={{ marginTop: '3rem' }}>
            <h1>Signup</h1>

            <Input type={'text'} value={details.username} setValue={(e) => { setDetails({ ...details, username: e }) }} placeholder={'Username'} required={true} />

            <Input type={'email'} value={details.email} setValue={(e) => { setDetails({ ...details, email: e }) }} placeholder={'user@e-mail.com'} required={true} />

            <Input type={show ? 'text' : 'password'} value={details.password} setValue={(e) => { setDetails({ ...details, password: e }) }} placeholder={'Password'} required={true} show={show} toogle={setShow} />

            <Input type={'password'} value={details.confirmPass} setValue={(e) => { setDetails({ ...details, confirmPass: e }) }} placeholder={'Confirm Password'} required={true} />

            <Button text={'Submit'} clickHandle={submitHandler} stretched={true} color={'rgb(212, 143, 16)'} />

            <p>Already have an account? <Link to={'/login'} >Login</Link></p>

          </div>
      }
    </>
  )
}

export default Signup
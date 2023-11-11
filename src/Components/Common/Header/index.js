import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../Loader';

function Header() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      }
      else {
        setLogged(false);
      }
    })
  })

  async function handleSignout() {
    try {
      setIsLoading(true);
      await signOut(auth);
      toast.success("You're Signed-out!");
      navigate('/');
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

          <div className='header-container'>
            <h1>Cards0</h1>

            {
              logged ?
                <div className='but out'>
                  <Button text={'Logout'} clickHandle={handleSignout} color={'rgb(255, 47, 47)'} />
                </div>
                :
                <div className='but'>
                  <Button text={'Signup'} clickHandle={() => { navigate('/signup') }} color={'rgb(212, 143, 16)'} />
                  <Button text={'Login'} clickHandle={() => { navigate('/login') }} color={'rgb(6, 29, 129)'} />
                </div>
            }

          </div>
      }
    </>
  )
}

export default Header
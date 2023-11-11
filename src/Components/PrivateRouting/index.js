import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import {Outlet, Navigate} from 'react-router-dom';
import Loader from '../Common/Loader';

function PrivateRouting() {
  // useAuthState is a hook from react-firease-hooks library that helps is getting logged in state of user
    const [user, loading, error] = useAuthState(auth);

  return (
    loading?
    <Loader/>
    :
    (!user || error)?
    <Navigate to={'/login'} replace />
    :
    // outlet - is used to render children of the current component in routing
    <Outlet/>
  )
}

export default PrivateRouting
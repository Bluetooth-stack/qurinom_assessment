import React, { useState } from 'react';
import './style.css';
import Input from '../Common/Input';
import Button from '../Common/Button';
import CloseIcon from '@mui/icons-material/Close';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import Loader from '../Common/Loader';

function ForgotPassword({ setDisplayModal }) {
    const [mail, setMail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSend() {
        try {
            setIsLoading(true);
            await sendPasswordResetEmail(auth, mail);
            setDisplayModal(false);
            toast.success('Password reset link has been sent to your mail!');
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            toast.error(error?.message);
            setIsLoading(false);
        };
    }

    return (
        <div className='modalHolder' onClick={() => { setDisplayModal(false) }}>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='modal' onClick={(e) => { e.stopPropagation() }}>
                        <CloseIcon className='closeIcon' onClick={() => { setDisplayModal(false) }} />
                        <h1>Reset Password</h1>
                        <p>Password reset link will be sent to your E-mail.</p>
                        <Input type={'email'} value={mail} setValue={(e) => { setMail(e) }} placeholder={'Registered e-mail'} required={true} forgot={true} />
                        <Button text={'Send'} clickHandle={handleSend} stretched={true} color={'rgb(0, 68, 255)'} />
                    </div>
            }
        </div>
    )
}

export default ForgotPassword
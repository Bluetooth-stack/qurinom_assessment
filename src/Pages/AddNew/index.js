import React, { useState } from 'react'
import Input from '../../Components/Common/Input';
import TextInput from '../../Components/Common/Input/TextInput';
import FileInput from '../../Components/Common/Input/FileInput';
import Button from '../../Components/Common/Button';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Common/Loader';

function AddNew() {
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleUpload() {
        if (title === '' || info === '') {
            toast.warn('Please provide proper details!');
            return;
        }

        try {
            setIsLoading(true);
            let downloadableLink = null;
            if (file !== null) {
                const fileRef = ref(
                    storage,
                    `userfiles/${auth.currentUser?.uid}/${Date.now()}`
                );
                await uploadBytes(fileRef, file);

                downloadableLink = await getDownloadURL(fileRef);
            }
            const cardDetails = {
                title: title,
                description: info,
                file: downloadableLink,
                createdBy: auth.currentUser?.uid,
                onGoing: false,
                completed: false
            }

            await addDoc(collection(db, "tasks"), cardDetails);
            toast.success('Card created!');
            navigate('/dashboard');
            setIsLoading(false);
        }
        catch (error) {
            toast.error(error?.message);
            console.log(error);
            setIsLoading(false);
        }

    }


    return (
        <>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='signup-form'>
                        <h1>Got something new to do!</h1>

                        <Input type={'text'} value={title} setValue={(e) => { setTitle(e) }} placeholder={'Title'} required={true} />
                        <TextInput rows={5} cols={10} value={info} setValue={(e => { setInfo(e) })} required={true} placeholder={'Program Info'} />
                        <FileInput id={'fileUpload'} value={file} fileHandleFunc={(e) => { setFile(e) }} />

                        <Button text={'Upload'} clickHandle={handleUpload} stretched={true} color={'grey'} />

                    </div>
            }
        </>
    )
}

export default AddNew
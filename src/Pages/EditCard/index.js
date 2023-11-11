import React, { useEffect, useState } from 'react'
import Input from '../../Components/Common/Input'
import TextInput from '../../Components/Common/Input/TextInput'
import FileInput from '../../Components/Common/Input/FileInput'
import Button from '../../Components/Common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../firebase'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Loader from '../../Components/Common/Loader'


let prevFileLink = null;

function EditCard() {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { docid } = useParams();


  useEffect(() => {
    getCardDetails(docid)
  }, [docid])

  // get the details of the card that is being edited
  async function getCardDetails(id) {
    try {
      setIsLoading(true);
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setInfo(docSnap.data().description);
        prevFileLink = docSnap.data().file;
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    catch (error) {
      toast.error('No card found to update!')
      console.log(error);
      setIsLoading(false);
    }
  }

  // update the card with new details
  async function handleUpdate() {
    if (title === '' || info === '') {
      toast.warn('Please provide proper details!');
      return;
    }
    try {
      setIsLoading(true);
      let newFile = null;
      if (file !== null) {
        const fileRef = ref(
          storage,
          `userfiles/${auth.currentUser.uid}/${Date.now()}`
        );

        await uploadBytes(fileRef, file);

        newFile = await getDownloadURL(fileRef);
      }

      const updatedCard = {
        title: title,
        description: info,
        file: newFile ? newFile : prevFileLink,
        createdBy: auth.currentUser?.uid,
        onGoing: false,
        completed: false
      }

      await updateDoc(doc(db, "tasks", docid), updatedCard);
      toast.success('Card Updated!');
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
            <h1>Want to change something!</h1>

            <Input type={'text'} value={title} setValue={(e) => { setTitle(e) }} placeholder={'Title'} required={true} />
            <TextInput rows={5} cols={10} value={info} setValue={(e => { setInfo(e) })} required={true} placeholder={'Program Info'} />
            <FileInput id={'fileUpload'} value={file} fileHandleFunc={(e) => { setFile(e) }} />

            <Button text={'Update'} clickHandle={handleUpdate} stretched={true} color={'grey'} />

          </div>
      }
    </>
  )
}

export default EditCard
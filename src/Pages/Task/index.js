import React, { useEffect, useState } from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import TaskHolder from '../../Components/TaskHolders';
import './style.css'
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../../Components/Common/Loader';

function Task() {
    const [todos, setTodos] = useState([]);
    const [added, setAdded] = useState([])
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [dragged, setDragged] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        // to get realtime updates on documents on firebase firestore
        const unsubscribe = onSnapshot(
            query(collection(db, 'tasks')),
            (querySnapshot) => {
                const currentUserTask = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().createdBy === auth.currentUser.uid) {
                        currentUserTask.push({ id: doc.id, ...doc.data() });
                    }
                })
                setTodos(currentUserTask);
                setIsLoading(false);
            },
            (error) => {
                console.log('Could not fetch doc--->', error);
                toast.error('Something went wrong, please try again later!');
                setIsLoading(false);
            }
        )

        return () => {
            // to stop looking into the doc for new updates
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (todos.length) {
            setAdded(todos.filter((todo) => (
                !todo.onGoing && !todo.completed
            )));
            setOngoing(todos.filter((todo) => (
                todo.onGoing
            )))
            setCompleted(todos.filter((todo) => (
                todo.completed
            )))
        }
    }, [todos])

    function dragStartHandler(e, id) {
        // getting the dragged card id
        setDragged(id);
    }

    async function dragEndHandler(e, to, from) {
        if (to === from) {
            return;
        }

        const docRef = doc(db, 'tasks', dragged); // docref from firestore to update on drag-end
        const [draggedTask] = todos.filter((todo) => (todo.id === dragged)); // filtering details of the dragged card

        if (from === 0) {
            setAdded(added.filter((todo) => (
                todo.id !== dragged
            )));
            if (to === 1) {
                setOngoing([...ongoing, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: true,
                    completed: false
                })
            }
            else {
                setCompleted([...completed, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: false,
                    completed: true
                })
            }
        }
        if (from === 1) {
            setOngoing(ongoing.filter((todo) => (
                todo.id !== dragged
            )));
            if (to === 0) {
                setAdded([...added, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: false,
                    completed: false
                })
            }
            else {
                setCompleted([...completed, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: false,
                    completed: true
                })
            }
        }
        if (from === 2) {
            setCompleted(completed.filter((todo) => (
                todo.id !== dragged
            )));
            if (to === 0) {
                setAdded([...added, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: false,
                    completed: false
                })
            }
            else {
                setOngoing([...ongoing, draggedTask]);
                await updateDoc(docRef, {
                    onGoing: true,
                    completed: false
                })
            }
        }

    }

    return (
        <>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className='dash-container'>
                        <div className='heading'>
                            <h1>Welcome Back <span>{auth?.currentUser?.displayName}</span></h1>
                            <p>Manage your Tasks, its just drag-n-drop!</p>
                        </div>
                        <div className='taskContainer'>
                            <TaskHolder title={'New'} todos={added} setTodos={setAdded} classname={''} taskId={0} DragStarthandler={dragStartHandler} dragEndHandler={dragEndHandler} />

                            <TaskHolder title={'Ongoing'} todos={ongoing} setTodos={setOngoing} classname={'ongoing'} taskId={1} DragStarthandler={dragStartHandler} dragEndHandler={dragEndHandler} />

                            <TaskHolder title={'Completed'} todos={completed} setTodos={setCompleted} classname={'completed'} taskId={2} DragStarthandler={dragStartHandler} dragEndHandler={dragEndHandler} />
                        </div>
                        <AddCircleOutlinedIcon className='addIcon' onClick={() => { navigate(`/${auth.currentUser?.uid}/addnew`) }} />
                    </div>
            }
        </>
    )
}

export default Task
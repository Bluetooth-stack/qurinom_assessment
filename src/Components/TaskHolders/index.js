import React from 'react';
import Card from '../Card';
import './style.css';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// to get the taskId of the grid to where the card is dragged to
let draggedTo = null;

function TaskHolder({ title, todos, setTodos, classname, taskId, DragStarthandler, dragEndHandler }) {

    async function handleDelete(id) {
        if (window.confirm('Are you sure, you want to delete this card!!')) {
            try {
                setTodos(todos.filter((todo) => (todo.id !== id)));
                await deleteDoc(doc(db, 'tasks', id));
                toast.success('Card deleted!');
            }
            catch (error) {
                toast.error(error?.message);
                console.log(error);
            }
        }
    }


    return (
        <div className={`holder ${classname}`}
            onDragEnter={() => { draggedTo = taskId }}
            onDragEnd={(e) => { dragEndHandler(e, draggedTo, taskId) }}
        >
            <h3>{title}</h3>
            {
                todos.length ?
                    todos.map((todo) => (
                        <Card todo={todo} handleDelete={handleDelete} key={todo.id} onDragStarthandler={DragStarthandler} />
                    ))
                    :
                    <p>No Cards</p>
            }
        </div>
    )
}

export default TaskHolder
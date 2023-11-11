import React from 'react';
import './style.css'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useNavigate } from 'react-router-dom';


function Card({ todo, handleDelete, onDragStarthandler }) {

    const navigate = useNavigate()

    return (
        <div className='card' draggable onDragStart={(e) => { onDragStarthandler(e, todo.id) }}>
            <h4>{todo.title}
                <span>
                    <ModeEditOutlineOutlinedIcon className='icn edit' onClick={() => { navigate(`/${todo.id}/edit`) }} />
                    <DeleteOutlineOutlinedIcon className='icn dlt' onClick={() => { handleDelete(todo.id) }} />
                </span>
            </h4>
            <p>{todo.description}</p>
            <p>File : {todo.file ? <a href={todo?.file} target="_blank" rel='noreferrer'>View file</a>: '- NA -'} </p>
        </div>
    )
}

export default Card
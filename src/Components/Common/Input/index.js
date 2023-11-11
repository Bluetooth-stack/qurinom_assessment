import React from 'react'
import './style.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({ type, value, setValue, placeholder, required, show, toogle, forgot }) {
    return (
        <section className={`inputHolder ${forgot?'forgot': ''}`}>
            <input className='input'
                type={type}
                value={value ? value : ''}
                onChange={(e) => { setValue(e.target.value) }}
                required={required}
                placeholder={placeholder}
            />
            {
                placeholder === 'Password' ?
                <span onClick={()=>{toogle(!show)}}>
                    {
                        show ? <VisibilityOffIcon className='eye' /> : <VisibilityIcon className='eye' />
                    }
                </span>
                :
                <></>
            }
            <div className='bottom'></div>
        </section>
    )
}

export default Input
import React from 'react';
import './style.css';
import LogoutIcon from '@mui/icons-material/Logout';

function Button({ text, clickHandle, stretched, color }) {
  return (
    <>
      {
        text === 'Logout' ?
          <button
            className={`btn ${stretched ? 'stretchedBtn' : ''} logout`}
            onClick={clickHandle}
            style={{ background: color }}
          >
            <span>
              {text}
            </span>
            <LogoutIcon className='logoutIcon' />
          </button>
          :
          <button
            className={`btn ${stretched ? 'stretchedBtn' : ''}`}
            onClick={clickHandle}
            style={{ background: color }}
          >
            {text}
          </button>
      }
    </>
  )
}

export default Button
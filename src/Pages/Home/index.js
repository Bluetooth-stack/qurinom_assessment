import React from 'react';
import './style.css';
import character from '../../Assets/Character.png';
import Button from '../../Components/Common/Button';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div className='home-container'>

      <img src={character} alt="character" className='character' />
      
      <div className='infoContainer'>
        <p style={{ fontFamily: 'Agbalumo', color: 'grey', fontSize: '2rem' }}>
          We take care of your tasks!!
        </p>

        <p style={{margin:'0 0 2rem 0'}}>
          In today's fast-paced world, it can be difficult to keep track of everything you have to do, that's where to-do apps come in. Login to our app and boost your productivity.
        </p>

        <Button text={'Login'} clickHandle={() => { navigate('/login') }} color={'rgb(6, 29, 129)'} />
      </div>

    </div>
  )
}

export default Home
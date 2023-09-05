import React, { useState } from 'react';
import Admincon from './Admincon';

function Control() {
  const [showChatOverlay, setShowChatOverlay] = useState(false);

  const handleChatIconClick = () => {
    setShowChatOverlay((prevValue) => !prevValue); 
  };


  return (
    <div className="containerad">
      <div className="sidebar1">
        <div className='hed'>
          <span className="he">
            <img className="oko" src="https://img.rehousingpackers.in/cndimg/rehousing-packers-pvt-ltd-logo.png" alt="logo"></img>
          </span>
        </div>
        <svg className='chatb' onClick={handleChatIconClick} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/>
        </svg>
        <li className='list'>Chat</li>
      </div>
      {showChatOverlay && <div className='box-ab'>
        <Admincon/>
      </div>}
      
    </div>
  );
}

export default Control;

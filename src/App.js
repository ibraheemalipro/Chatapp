import React, { useState } from 'react';
import {  Router, Switch, Route, Link, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Chatbox from '../src/com/Chatbox';
import AdminChatbox from '../src/com/AdminChatbox';
import ChatPage from './com/ChatPage';
import "./App.css"
import Admincon from './com/Admincon'
import Control from './com/Control';

const App = () => {
  const [user, setUser] = useState(null);

  const handleRegister = (username) => {
    

    console.log(`${username} has been registered!`);
  };

         
  return (
  


<Routes>
    <Route  path='/' element={<RegistrationForm onRegister={handleRegister} />}  />
    <Route path='/admincon' element={<Admincon/>}  />
      <Route path="/user" element={<Chatbox />}/>
      <Route path='/control' element={<Control/>} />
      <Route path="/admin/:name" element={<AdminChatbox />} />
    
    
    </Routes>



  );
};

export default App;

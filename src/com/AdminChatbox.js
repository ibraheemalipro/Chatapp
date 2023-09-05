import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  ref,
  push,
  serverTimestamp,
  onValue,
  off,
} from 'firebase/database';
import { database } from '../firebaseConfig';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';
import { faComment, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminChatbox = (props) => {
  const [userMessages, setUserMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // Added file state;
  const cokk=document.cookie
  console.log(cokk)
const name = props.name
  // const { name } = useParams();
  const chatboxRef = useRef(null);

  useEffect(() => {
    const userRef = ref(database, `users/${name}/chat`);
    const adminRef = ref(database, `users/chat`);
    
    const onUserData = (snapshot) => {
      const data = snapshot.val();
      const userMessages = data ? Object.values(data) : [];
      setUserMessages(userMessages);
      scrollToBottom();
    };

    const onAdminData = (snapshot) => {
      const data = snapshot.val();
      const adminMessages = data ? Object.values(data) : [];
      setAdminMessages(adminMessages);
      scrollToBottom();
    };

    onValue(userRef, onUserData);
    onValue(adminRef, onAdminData);

    return () => {
      off(userRef, onUserData);
      off(adminRef, onAdminData);
    };
  }, [name]);

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const sendMessage = (e,) => {
    e.preventDefault();
    if (message.trim() !== '' || file) {
      const messageData = {
        text: message,
        timestamp: serverTimestamp(),
        sender: 'admin',
      };

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          
          messageData.file = {
            url: reader.result,
            name: file.name,
            type: file.type,
            size: file.size,
           
          };

          push(ref(database, `users/${name}/chat`), messageData);
          setMessage('');
          setFile(null);
        };

        // Start loading the file data
        reader.readAsDataURL(file);
      } else {
        push(ref(database, `users/${name}/chat`), messageData);
        setMessage('');
      }
    }
  };

  function convertServerTimestampToTime(serverTimestamp) {
    if (!serverTimestamp) {
      return ''; 
    }
  
    const date = new Date(serverTimestamp);
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
  
    return `${hours}:${minutes}`;
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className='show'>
    <div className='chathead' ><span className="he"> <img  className="oko" src="https://img.rehousingpackers.in/cndimg/rehousing-packers-pvt-ltd-logo.png"></img></span><h3>{name}</h3></div>
    
    <div className="container">
      <div className="row">
        <div className='.chat-body1'>
          {userMessages.map((msg, index) => (
            <main key={index} className={`msger-chat ${msg.sender === name ? 'left-msg' : 'right-msg'}`}>
              <div
                className="msg-img"
                style={{
                  backgroundImage: msg.sender === name
                    ? ''
                    : 'url(https://media.istockphoto.com/id/1406645290/photo/big-financial-data-theft-concept-an-anonymous-hacker-is-hacking-highly-protected-financial.jpg?s=2048x2048&w=is&k=20&c=VqiT6dBByZY7LxmGom8gJ8kIfHtZIeEMo_cWevkuQwk=)'
                }}
              ></div>
              <div className="msg-bubble">
                <div className="msg-info">
                  {/* <div className="msg-info-name">{msg.sender}</div> */}
                  <div className="msg-info-time">{convertServerTimestampToTime(msg.timestamp)}</div>
                </div>
                {msg.file && (
                  <div className="msg-file">
                    <span><img src={msg.file.url} alt="Uploaded File"></img></span>
                  </div>
                )}
                <div className="msg-text">{msg.text}</div>
                <div className="msg-text">{msg.name}</div>
                <div className="msg-text">{msg.number}</div>
              </div>
            </main>
          ))}
        </div>
        {/* Chat input area */}
        <div className="chat-footer1">
              <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
               
              />
              <label htmlFor="fileInput">
                <FontAwesomeIcon icon={faPaperclip} />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
        <div ref={chatboxRef}></div>
      </div>
    </div>
  </div>
  
  );
};

export default AdminChatbox;

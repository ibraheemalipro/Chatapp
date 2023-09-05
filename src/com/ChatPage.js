import React from 'react';
import { useParams } from 'react-router-dom';
import Chatbox from './Chatbox';
import AdminChatbox from './AdminChatbox';

const ChatPage = () => {
  // Get the "name" parameter from the URL using useParams
  const { name } = useParams();

  return (
    <div>
      <h2>User Chatbox</h2>
      <Chatbox user={name} />
      <h2>Admin Chatbox</h2>
      <AdminChatbox />
    </div>
  );
};

export default ChatPage;

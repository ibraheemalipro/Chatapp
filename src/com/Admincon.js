import React, { useEffect, useState } from 'react';
import AdminChatbox from './AdminChatbox';

function Admincon() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Keep track of the selected user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://chatbox-a5c63-default-rtdb.firebaseio.com/users.json");
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const data = await response.json();
        const userArray = Object.keys(data);
        setUserData(userArray);
        console.log(userArray)
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, []);

  const handleUserClick = (userName) => {
    setSelectedUser(userName);
  }; 
  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1>Messages</h1>
        <ul>
          {userData.map((userName) => (
            <li key={userName}>
              <span onClick={() => handleUserClick(userName)}>{userName}</span>
              

             
            </li>
          ))}
        </ul>
      </div>
      <div className="chatbox-container">
        {selectedUser && <AdminChatbox name={selectedUser} />}
      </div>
    </div>
  );
}

export default Admincon;

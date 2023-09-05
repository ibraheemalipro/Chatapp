import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Admincon from './Admincon';
import AdminChatbox from './AdminChatbox';
import { database } from '../firebaseConfig';

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("https://chatbox-a5c63-default-rtdb.firebaseio.com/users.json");
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const data = await response.json();

        const userArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        
        console.log(userArray);
        setUserData(userArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <h1  className='adminh1'>Messages</h1>
        <ul>
          {userData.map((user) => (
            <li key={user.id}>
              <Link to={`/admin/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="chatbox">
        <AdminChatbox />
      </div>
    </div>
  );
};

export default AdminDashboard;

// LoginForm.js

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database, ref, get } from './firebaseConfig'; // Import the necessary functions
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        // User is logged in, retrieve the user's name from the database
        const userRef = ref(database, 'users');
        const snapshot = await get(userRef);
        const usersData = snapshot.val();
        const matchedUser = Object.values(usersData).find((user) => user.email === email);

        if (matchedUser) {
          // Redirect to the next page with the user's name as a parameter
          navigate(`/user/${matchedUser.name}`);
        } else {
          console.log('User not found');
        }
      }
    } catch (error) {
      // Handle login error...
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

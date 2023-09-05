// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set,get } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCeBIA3Lg1foOTbMhzwJZjNP_gIq5vSaew",
  authDomain: "chatbox-a5c63.firebaseapp.com",
  databaseURL: "https://chatbox-a5c63-default-rtdb.firebaseio.com",
  projectId: "chatbox-a5c63",
  storageBucket: "chatbox-a5c63.appspot.com",
  messagingSenderId: "784894938030",
  appId: "1:784894938030:web:62a5026bdcd94926e7d63f",
  measurementId: "G-XM5QGS5J91"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


export { app, database, auth, ref, set,get }
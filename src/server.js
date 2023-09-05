const express = require('express');
const http = require('http').createServer(express);
const io = require('socket.io')(http);
const cors = require('cors'); // Import the cors package

const app = express(); // Define the app

// Use the cors middleware to allow cross-origin requests
app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


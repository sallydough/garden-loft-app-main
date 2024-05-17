const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

//new imports
const http = require("http").Server(app);
const cors = require("cors");


app.use(cors());



const socketIo = require('socket.io')(http, {
  cors: {
    // MUST CHANGE IP ADDRESS TO MATCH YOUR NETWORK IP ADDRESS 
    // please change ip address in server.js as well
    origin: "http://10.0.0.193:3000", //sally wifi
    // origin: "http://192.168.1.73:3000", //thin air labs wifi
    // origin: "http://10.44.22.86:3000", //inception wifi
    methods: ["GET", "POST"],
    // origin: "*"
  }
});

socketIo.on('connection', (socket) => {
  //shows your meetingID
  console.log('A user connected');
  // socket.emit("me", socket.id);
  socket.emit("ping",{data: "Hello sending back to you"});

  socket.on("ping", () => {
    console.log("Ping received");
    socket.emit("ping", {data: "socket.io is received dude"});
  });

  socket.on('callUser', ({ calleeId, from, name, callId }) => {
    socket.to(calleeId).emit('incomingCall', { from, name, callId });
  });

  socket.on('answerCall', (data) => {
    socket.to(data.callId).emit('callAccepted', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  // //Call ended 
  // socket.on("disconnect", () => {
  //   socket.broadcast.emit('callEnded', offer);
  // })

  // //Call User
  // socket.on("callUser", (data) => {
  //   io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
  // })

  // //answer call
  // socket.on("answerCall", (data) => io.to(data.to).emit("callAccepted"), data.signal)


  // // Relay 'offer' messages
  // socket.on('offer', (offer) => {
  //   socket.broadcast.emit('offer', offer);
  // });

  // // Relay 'answer' messages
  // socket.on('answer', (answer) => {
  //   socket.broadcast.emit('answer', answer);
  // });

  // // Relay 'candidate' messages
  // socket.on('candidate', (candidate) => {
  //   socket.broadcast.emit('candidate', candidate);
  // });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
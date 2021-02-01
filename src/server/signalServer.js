const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on 3001`));
const io = require('socket.io')(server);

function startSession(data, socket) {

  const {roomId, username} = data

  // Check if room already exists
  if (io.sockets.adapter.rooms.has(roomId)) {
    socket.emit('error', data.roomId +' already taken')
  } else {
    // Create + join room
    socket.join(roomId);
    // Send success message
    socket.emit('success', 'Successfully started '+roomId);
    console.log(username + ' started ' + roomId + ' using socket: '+socket.id);
  }

}

function joinSession(data, socket){

  // Establish variables
  const {roomId, username} = data;
  // Check if room is open
  if (!io.sockets.adapter.rooms.has(roomId)){
    socket.emit('error', roomId +' is not active');
  }
  else if (!socket) {}
  else {
    socket.join(roomId);
    socket.emit('success', 'Successfully joined '+roomId);
    socket.to(roomId).emit('joined', username);
    console.log(username + ' joined ' + roomId);
  }
}

function leaveSession(data, socket){

  const {roomId, username} = data;

  if (!io.sockets.adapter.rooms.has(roomId)) { } //  Ignore leftover instance
  else {
    // Broadcast update
    socket.to(roomId).emit('left', username);
    console.log(username + ' left ' + roomId);
  }

}

function move(data, socket){

  const { username, roomId, position } = data

  if (!socket.rooms.has(roomId)) { return } //  Ignore leftover instance
  else {
    socket.to(roomId).emit('moved', {username:username,position:position})
  }
}

function disconnect(socket){

  // Iterate through all rooms

  socket.rooms.forEach( (socket) => {
    console.log(socket.id);
  });
}

io.on('connection', (socket) => {

  console.log(socket.id+' Connected');

  socket.on('startSession', (data) => startSession(data, socket) );

  socket.on('joinSession', (data) => joinSession(data, socket) );

  socket.on('leaveSession', (data) => leaveSession(data, socket) );

  socket.on('endSession', (data) => { }); // TODO:

  socket.on('success', (roomId) => { socket.emit(games[roomId].active) })

  socket.on('disconnect', () => disconnect(socket) );

  socket.on('move', (data) => { move(data, socket) } );

});

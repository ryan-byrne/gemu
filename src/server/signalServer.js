const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on 3001`));
const io = require('socket.io')(server);

var rooms = {};

function startSession(data, socket) {

  const {roomId, username} = data

  // Check if room already exists
  if (io.sockets.adapter.rooms.has(roomId)) {
    socket.emit('error', data.roomId +' already taken')
  } else {
    // Create + join room
    socket.join(roomId);
    rooms[roomId] = {active:[{username:username,id:socket.id}],inactive:[]}
    // Send success message
    socket.emit('success', {
      room:rooms[roomId],
      message:'Successfully connected to: '+roomId
    });
    console.log(username + ' started ' + roomId + ' using socket: '+socket.id);
  }

}

function joinSession(data, socket){

  // Establish variables
  const {roomId, username} = data;

  // Check if room is open
  if (!(roomId in rooms)){ socket.emit('error', roomId +' is not active') }
  else if (!socket) {}
  else {
    if (rooms[roomId].active.filter((player)=>player.username===username).length===0){
      socket.join(roomId);
      rooms[roomId].active.push({username:username,id:socket.id});
      socket.emit('success', {
        message:'Successfully joined '+roomId,
        room:rooms[roomId]
      });
      socket.to(roomId).emit('joined', {message:username +" has joined",room:rooms[roomId]});
      console.log(username + ' joined ' + roomId);
    }
    else {
      socket.emit('error', 'There is already a '+username +' in '+roomId)
    }
  }
}

function leaveSession(data, socket){

  const {roomId, username} = data;

  if (!(roomId in rooms)) { } //  Ignore leftover instance
  else {
    // Broadcast update
    var room = rooms[roomId];
    const index = rooms[roomId].active.map((player,index)=> {
      if (player.username === username) { return index }
    });
    room.inactive.push(room.active.pop(index));
    socket.to(roomId).emit('left', {message:username+' left', room:room})
    console.log(username + ' left ' + roomId);
  }

}

function getPlayers(roomId, socket){
  console.log('Getting players');
  socket.to(roomId).emit('playerData', io.sockets.adapter.rooms[roomId])
}

function move(data, socket){

  const { username, roomId, position } = data

  if (!socket.rooms.has(roomId)) { return } //  Ignore leftover instance
  else {
    socket.to(roomId).emit('moved', {username:username,position:position})
  }
}

function disconnecting(socket){

  // Iterate through all rooms
  socket.rooms.forEach((room)=>{
    if (room in rooms) {
      rooms[room].active.map((player)=>{
        if (player.id === socket.id) {
          const data = {roomId:room,username:player.username}
          leaveSession(data, socket);
        }
      });
    }
  });
}

io.on('connection', (socket) => {

  console.log(socket.id+' Connected');

  socket.on('startSession', (data) => startSession(data, socket) );

  socket.on('joinSession', (data) => joinSession(data, socket) );

  socket.on('leaveSession', (data) => leaveSession(data, socket) );

  socket.on('endSession', (data) => { }); // TODO:

  socket.on('getPlayers', (roomId) => getPlayers(roomId, socket));

  socket.on('success', (roomId) => { socket.emit(games[roomId].active) })

  socket.on('disconnecting', () => disconnecting(socket) );

  socket.on('move', (data) => { move(data, socket) } );

});

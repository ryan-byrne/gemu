const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on 3001`));
//const io = require('socket.io')(server);

// TODO: Game freezes up if too many players are moving
// Doesn't seem to affect across rooms

var games = {}

function startSession(data, socket) {
  const {roomId, username} = data

  if (roomId in games) {socket.emit('error', data.roomId +' already taken')}
  else {
    socket.join(roomId); // Create + join room
    // Store data
    games[roomId] = {
      startedBy:username,
      startedAt:Date(),
      active:[{username:username, id:socket.id,x:0,y:0}],
      inactive:[]}
    // Send success message
    socket.emit('success', games[roomId]);
    console.log(username + ' started ' + roomId + ' using socket: '+socket.id);

  }

}

function joinSession(data, socket){
  // Establish variables
  const {roomId, username} = data;
  // Check if room is open
  if (!games[roomId]){ socket.emit('error', roomId +' is not active');return; }

  const inactive = games[roomId].inactive;
  const active = games[roomId].active

  // Check no one already has the name
  if (active.includes(username)){ socket.emit('error', data.username + ' is taken')}
  else {
    // Check if name was previously used
    inactive.includes(username) ? inactive.pop(inactive.indexOf(username)) : null
    // Add to room socket + games
    socket.join(roomId); active.push({username:username,id:socket.id,x:0,y:0});
    socket.emit('success', games[roomId]); // Sets socket in client
    socket.to(roomId).emit('joined', {username:username,game:games[roomId]});
    console.log(username + ' joined ' + roomId);
  }
}

function leaveSession(data, socket){

  const {roomId, username} = data;

  if (!games[roomId]) { return } //  Ignore leftover instance
  else {

    // Establish player arrays
    const active = games[roomId].active;
    const inactive = games[roomId].inactive;

    // Switch player to inactive
    var playerIdx = active.map( (player, idx) =>  {
      if (player.username === username) { return idx }
    });
    inactive.push( active.pop(playerIdx).username );
    // Broadcast update
    socket.to(roomId).emit('left', {username:username,game:games[roomId]});
    console.log(username + ' left ' + roomId);
  }

}

function move(data, socket){

  const { username, roomId, position } = data

  if (!games[roomId]) { return } //  Ignore leftover instance

  // Iterate through players
  games[roomId].active.map( (player) => {
    if ( player.username === username ) {
      player['x'] = position.x;
      player['y'] = position.y;
    }
  });

  socket.to(roomId).emit('moved', {username:username, game:games[roomId]})
}

function disconnect(socket){

  // Iterate through all rooms
  for (let roomId in games) {
    // Iterate through active players in room
    games[roomId].active.map( (player) => {
      const { username, id } = player;
      // Leave game if socket matches
      if ( id === socket.id ) {
          leaveSession({username:username, roomId:roomId}, socket);
      }
    });
  }
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

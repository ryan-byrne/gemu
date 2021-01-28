const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on 3001`));
const io = require('socket.io')(server);

// TODO: Open game add sockets for players

var games = {}

io.on('connection', (socket) => {

  console.log(socket.id+' Connected');

  socket.on('startSession', (data) => {

    if (data.roomId in games) {socket.emit('error', data.roomId +' already taken')}
    else {
      socket.join(data.roomId);
      games[data.roomId] = {startedBy:data.username,startedAt:Date(),players:[data.username]}
      socket.emit('success', 'successfully started'+data.roomId);
    }

  });

  socket.on('joinSession', (data) => {

    if (!(data.roomId in games)){
      socket.emit('error', data.gameId +' is not active');
    }
    else if (games[data.roomId].players.includes(data.username)){
      socket.emit('error', 'There is alread someone named '+data.username)
    } else {
      socket.join(data.roomId);
      games[data.roomId].players.push(data.username);
      socket.emit('success', 'successfully joined'+data.roomId);
      socket.to(data.roomId).emit('joined', data.username)
    }
  });

  socket.on('leaveSession', (data) => {
    socket.leave(data.roomId)
    if (!games[data.roomId]){}
    else {
      games[data.roomId].players.push(data.username);
      socket.to(data.roomId).emit('left', data.username)
    }
  });

  socket.on('endSession', (data) => { }); // TODO:

  socket.on('disconnect', () => console.log(socket.id+' disconnected'));

  socket.on('userMove', (data) => {
    socket.to(data.roomId).emit('move', {username:data.username, position:data.position})
  });

});

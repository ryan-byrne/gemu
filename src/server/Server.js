const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on 3001`));
const io = require('socket.io')(server);

// TODO: Open game add sockets for players

var games = {};

io.on('connection', (socket) => {

  console.log(socket.id+' Connected');

  socket.on('startSession', (data) => {
    // Start a new game
    if (data.roomId in games) {
      console.log(data.roomId+' Already Exists');
      socket.emit('error', data.roomId+' Already Exists')
    }
    else {
      games[data.roomId] = {'startedBy':data.username,'startedOn':Date(),'players':[data.username]}
      console.log(data.username + ' Started ' + data.roomId);
      socket.emit('success', data.username + ' Started ' + data.roomId);
    }
    console.log(games);
  });

  socket.on('joinSession', (data) => {
    // Join an existing game
    console.log(data.username + " is joining " + data.roomId);
    if (!games[data.roomId]) {
      console.log(data.roomId+" does not exist");
      socket.emit('error', data.roomId+" does not exist")
    } else if ( games[data.roomId].players.includes(data.username) ){
      console.log(data.roomId+" already has a "+data.username);
      socket.emit('error', data.roomId+" already has a "+data.username)
    } else {
      games[data.roomId].players.push(data.username);
      console.log(data.username + ' has joined ' + data.roomId);
      socket.emit('success', data.username + ' has joined ' + data.roomId)
    }
    console.log(games);
  });

  socket.on('leaveSession', (data) => {
    console.log(data.username + " is leaving " + data.roomId);
    games[data.roomId].players.splice(games[data.roomId].players.indexOf(data.username));
    console.log(games);
  });

  socket.on('endSession', (data) => {
    // TODO: 
  });

  socket.on('disconnect', () => console.log(socket.id+' disconnected'));

});

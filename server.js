const app = require('express')();
const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Listening on :$(PORT)`));
const io = require('socket.io')(server);

// TODO: Open game add sockets for players

var games = {};

io.on('connection', (socket) => {
  console.log('Connected to '+ socket.id);
  socket.on('startSession', (data) => {
    
  });
  socket.on('disconnect', () => console.log('User disconnected'));
});

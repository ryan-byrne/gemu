import React, { useState, useCallback, useEffect } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Lobby from './Lobby';
import Participant from './Participant';
const socket = require('socket.io-client')();

const Gemu = () => {

  // TODO: remove testing values

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomSocket, setRoomSocket] = useState(null);

  // Change to username
  const handleUserName = (event) => {
    if (typeof event === 'string') {setUsername(event)}
    else {
      if (!event.target.value) {event.target.className = 'badSubMenuItem' }
      else { event.target.className = 'goodSubMenuItem' }
      setUsername(event.target.value)
    }
  };

  // Change to room id
  const handleRoomId = (event) => {
    if (typeof event === 'string') {setRoomId(event)}
    else {
      if (event.target.value.length < 6) {event.target.className = 'badSubMenuItem' }
      else { event.target.className = 'goodSubMenuItem' }
      setRoomId(event.target.value.toUpperCase());
    }
  };

  // User starts room
  const handleStartGame = (event) => {
    if ( roomId.length !== 6 ) { } // Handle incorrect roomID
    else if (!username) { } // Handle empty username
    else { socket.emit('startSession', {username:username,roomId:roomId}) }
  };

  // User joins room
  const handleJoinGame = (event) => {
    if ( roomId.length !== 6 ) { }
    else if (!username) { }
    else { socket.emit('joinSession', {username:username,roomId:roomId}) }
  };

  // User leaves room
  const handleLogout = (event) => {
    socket.emit('leaveSession', {username:username, roomId:roomId})
    setRoomSocket(null);
  };

  socket.on('error', (message) => setRoomSocket(null));
  socket.on('success', () => setRoomSocket(socket))

  // TODO: Join active game with URL
  return (
    <BrowserRouter>
      { !roomSocket ? <Redirect to='/'/> : <Redirect to={roomId}/>}
      <Route exact path='/'>
        <Lobby username={username} roomId={roomId} handleJoinGame={handleJoinGame}
          handleStartGame={handleStartGame} handleUserName={handleUserName}
          handleRoomId={handleRoomId}/>
      </Route>
      <Route path={'/'+roomId}>
        <Participant username={username} roomSocket={roomSocket} handleLogout={handleLogout} />
      </Route>
    </BrowserRouter>
  )
}


export default Gemu;

import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Redirect, useLocation } from 'react-router-dom';

// Lobby Components
import Lobby from './lobby/Lobby';
import JoinGame from './lobby/JoinGame';

// Game Components
import Participant from './Participant';
import Game from './game/Game';

// Socket to communicate with the game server
const socket = require('socket.io-client')();

const Gemu = () => {

  // TODO: remove testing values

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [clientSocket, setClientSocket] = useState(null);
  const [connectionError, setConnectionError] = useState('');

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
    else if (!socket.connected) { } // TODO:
    else { socket.emit('startSession', {username:username,roomId:roomId}) }
  };

  // User joins room
  const handleJoinGame = (event) => {
    if ( roomId.length !== 6 ) { }
    else if (!username) { }
    else if (!socket.connected) {  } // TODO:
    else { socket.emit('joinSession', {username:username,roomId:roomId}) }
  };

  // User leaves room
  const handleLogout = (event) => {
    socket.emit('leaveSession', {username:username, roomId:roomId});
    setConnectionError('');
    setClientSocket(null);
  };

  socket.on('error', (message) => { setClientSocket(null); setConnectionError(message)});
  socket.on('success', () => setClientSocket(socket));

  // TODO: FORMAT ME
  const lobby = (
    <Lobby username={username} roomId={roomId} handleJoinGame={handleJoinGame}
      handleStartGame={handleStartGame} handleUserName={handleUserName}
      handleRoomId={handleRoomId} connectionError={connectionError}/>
  )

  // TODO: FORMAT ME
  const joinGame = (
    <div>
      <JoinGame username={username} setRoomId={setRoomId}
        handleUserName={handleUserName} handleJoinGame={handleJoinGame}
        />
      {connectionError}
    </div>
  )

  const game = (
    <div className='gameContainer'>
      <Game handleLogout={handleLogout} username={username} roomId={roomId}
        clientSocket={clientSocket}/>
    </div>
  )

  return (
    <BrowserRouter>
      <Route exact path='/'>
        { clientSocket ? game : lobby}
      </Route>
      <Route path={'/join/*'}>
        <div>
          { clientSocket ? <Redirect to='/'/> : null }
          {joinGame}
        </div>
      </Route>
    </BrowserRouter>
  )
}


export default Gemu;

import React, { useState } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

// Lobby Components
import Lobby from './lobby/Lobby';
import JoinGame from './lobby/JoinGame';

// Game Components
import Room from './room/Room'

// Create a Socket to communicate with the game server
const socket = require('socket.io-client')();

const Gemu = () => {

  // TODO: remove testing values

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [clientSocket, setClientSocket] = useState(null);
  const [connectionError, setConnectionError] = useState('');
  const [gameData, setGameData] = useState({});

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

  // Set error message and clear socket on failure
  socket.on('error', (message) => {
    setClientSocket(null);
    setConnectionError(message);
    setTimeout(() => {setConnectionError('')}, 3000);
  });

  // Set client socket on success
  socket.on('success', (game) => {
    setGameData(game);
    setClientSocket(socket);
  });

  // TODO: FORMAT ME
  const lobby = (
    <Lobby username={username} roomId={roomId} handleJoinGame={handleJoinGame}
      handleStartGame={handleStartGame} handleUserName={handleUserName}
      handleRoomId={handleRoomId}/>
  )

  // TODO: FORMAT ME
  const joinGame = (
    <JoinGame username={username} setRoomId={setRoomId}
        handleUserName={handleUserName} handleJoinGame={handleJoinGame}
        handleLogout={handleLogout}/>
  )

  // TODO: FORMAT ME
  const room = (
    <Room clientSocket={clientSocket} roomId={roomId} username={username}
      handleLogout={handleLogout} gameState={gameData} />
  )

  return (
    <div>
    <div className='connectionError'>{connectionError}</div>
    <BrowserRouter>
      <Route exact path='/'>
        { clientSocket ? room : lobby}
      </Route>
      <Route path={'/join/*'}>
        <div>
          { clientSocket ? <Redirect to='/'/> : null }
          {joinGame}
        </div>
      </Route>
    </BrowserRouter>
  </div>
  )
}


export default Gemu;

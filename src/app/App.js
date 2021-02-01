import React, { useState, useCallback, useEffect } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import './app.css';

// Lobby Components
import Lobby from './lobby/Lobby';
import JoinGame from './lobby/JoinGame';

// Game Components
import Room from './room/Room'

// Create a Socket to communicate with the game server
const socket = require('socket.io-client')();

const App = () => {

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [clientSocket, setClientSocket] = useState(null);
  const [message, setMessage] = useState({});

  // Change to username
  const handleUserName = (event, user) => {

    const { parentNode, value } = event.target;
    const entry = parentNode.children[0];

    const name = event.type === 'click' ? user : value;
    const cn = name.length > 0 ? 'goodInput' : 'badInput';

    entry.className = cn;
    entry.style.width = (Math.max(12,name.length*1.5)).toString()+'%';
    setUsername(name);
  };

  // Change to room id
  const handleRoomId = (event, room) => {

    const { parentNode, value, type } = event.target;
    const entry = parentNode.children[0];

    const id = event.type === 'click' ? room : value;
    const cn = id.length === 6 ? 'goodInput' : 'badInput';

    entry.className = cn;
    entry.style.width = (Math.max(12,id.length*1.5)).toString()+'%';
    setRoomId(id.toUpperCase());

  };

  // User starts room
  const handleStartGame = useCallback((event) => {
    if (validateEntries()) { socket.emit('startSession', {username:username, roomId:roomId}) }
  });

  // User joins room
  const handleJoinGame = useCallback((event) => {
    if (validateEntries()) { socket.emit('joinSession', {username:username, roomId:roomId}) }
  });

  const validateEntries = () => {
    var valid = true;
    if (!socket.connected) {
      handleMessage('Unable to connect to socket', 'red');
      valid=false;
    }
    if (roomId.length<6) {
      handleMessage('RoomID must be 6 characters long', 'red');
      valid=false;
    }
    if (!username) {
      handleMessage('You must provide a username', 'red');
      valid=false
    }
    return valid;
  }

  // User leaves room
  const handleLogout = (event) => {
    socket.emit('leaveSession', {username:username, roomId:roomId});
    setMessage({});
    setClientSocket(null);
  };

  const handleMessage = (message, color) => {
    setMessage({text:message,color:color});
    setTimeout(()=> {
      setMessage({});
    },2000);
  };

  const handleSuccess = useCallback((message) => {
    handleMessage(message, 'green');
    setClientSocket(socket);
  }, [setClientSocket]);

  const handleError = useCallback((message) => {
    handleMessage(message, 'red');
    setClientSocket(null);
  },[setClientSocket]);

  useEffect( () => {
    // Set error message and clear socket on failure
    socket.on('error', (message) => handleError(message) );
    // Set client socket on success
    socket.on('success', (message) => handleSuccess(message) );
  }, [handleError, handleSuccess])

  return (
    <div className='appContainer'>
      <div className='messageTicker' style={{color:message.color}}>{message.text}</div>
      <BrowserRouter>
        <Route exact path='/'>
          { clientSocket ?
            <Room clientSocket={clientSocket} roomId={roomId} username={username}
              handleLogout={handleLogout} setMessage={setMessage}/>
            :
            <Lobby username={username} roomId={roomId} handleJoinGame={handleJoinGame}
              handleStartGame={handleStartGame} handleUserName={handleUserName}
              handleRoomId={handleRoomId}/>
          }
        </Route>
        <Route path='/join/*'>
          <div>
            { clientSocket ? <Redirect to='/'/> : null }
            <JoinGame username={username} setRoomId={setRoomId}
                handleUserName={handleUserName} handleJoinGame={handleJoinGame}
                handleLogout={handleLogout}/>
          </div>
        </Route>
      </BrowserRouter>
      <div className='footer'>
        <p>Made by
          <a href='https://ryan-byrne.github.io'> Ryan Byrne </a>
          | Hosted on <a href="https://github.com/ryan-byrne/gemu">Github</a>
        </p>
      </div>
    </div>
  )
}


export default App;

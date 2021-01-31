import React, { useState, useCallback } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import './app.css';
import Message from './Message';

// Lobby Components
import Lobby from '../lobby/Lobby';
import JoinGame from '../lobby/JoinGame';

// Game Components
import Room from '../room/Room'

// Create a Socket to communicate with the game server
//const socket = require('socket.io-client')();

const Gemu = () => {

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [server, setServer] = useState(null)
  //const [clientSocket, setClientSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameData, setGameData] = useState({});

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
  const handleStartGame = (event) => {
    if ( roomId.length !== 6 ) {
      dispatchMessage('RoomId must be 6 characters long', 'red');
      document.getElementById('roomId').style.borderColor = 'red';
    } // Handle incorrect roomID
    if (!username) {
      dispatchMessage('You must provide a name', 'red')
      document.getElementById('user').style.borderColor = 'red';
    } // Handle empty username
    if (!server) { dispatchMessage("Could not start " + roomId + "'s server", 'red')}
    else { } // TODO:
  };

  // User joins room
  const handleJoinGame = (event) => {

    if ( roomId.length !== 6 ) {
      dispatchMessage('RoomId must be 6 characters long', 'red');
      document.getElementById('roomId').style.borderColor = 'red';
    } // Handle incorrect roomID
    if (!username) {
      dispatchMessage('You must provide a name', 'red')
      document.getElementById('user').style.borderColor = 'red';
    } // Handle empty username
    if (!server) { dispatchMessage("Could not Join " + roomId + "'s server", 'red')}
    else { } // TODO:
  };

  // User leaves room
  const handleLogout = (event) => {
    //socket.emit('leaveSession', {username:username, roomId:roomId});
    setMessages([]);
    setServer(null);
  };

  const dispatchMessage = useCallback((msg, color) => {
    setMessages([...messages, {message:msg,color:color}]);
  });

    /*

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
  */
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
    <Room server={server} roomId={roomId} username={username}
      handleLogout={handleLogout} gameState={gameData} />
  )

  const messageTicker = messages.map((message,index) => {
    return <Message key={index} message={message.message} color={message.color}/>
  });

  return (
    <div className='appContainer'>
      <div className='messageTicker'>{messageTicker}</div>
      <BrowserRouter>
        <Route exact path='/'>
          { server ? room : lobby}
        </Route>
        <Route path={'/join/*'}>
          <div>
            { server ? <Redirect to='/'/> : null }
            {joinGame}
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


export default Gemu;

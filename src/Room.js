import { React, useEffect, useState, useCallback } from 'react';
const socket = require('socket.io-client')();

const Room = ({username, roomId, handleLogout, gameState}) => {

  socket.on('message', (data) => console.log(data))

  function startSession(event) {
    socket.emit('startSession', {username:username,roomId:roomId,gameState:gameState})
  }

  return (
    <div>
      <div>{username} is {gameState} at {roomId}</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={startSession}>Start Session</button>
    </div>
  )
}

export default Room;

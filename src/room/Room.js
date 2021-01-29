import { React, useState, useEffect, useCallback } from 'react';
import Player from './Player';

const Room = ({clientSocket, username, roomId, handleLogout, gameState}) => {

  const [message, setMessage] = useState('');
  const [gameData, setGameData] = useState(gameState);
  const playerArray = gameData.active.map(player => (
    <li key={player.id}>{player.username} X:{player.x} Y:{player.y}</li>
  ));

  // WHen someone joins
  clientSocket.on('joined', (data) => {
    setMessage(data.username+' has joined');
    setGameData(data.game);
    setTimeout(() => {setMessage('')}, 3000);
  });

  // When someone leaves
  clientSocket.on('left', (data) => {
    setMessage(data.username+' has left');
    setGameData(data.game);
    setTimeout(() => {setMessage('')}, 3000);
  });

  // TODO: Allow for movement to be tracked by others
  // When someone moves
  clientSocket.on('moved', (data) => {
    console.log(data.username + 'moved to X: '+data.position.x+" Y: "+data.position.y);
  });

  return (
    <div>
      <div><b>{username}'s</b> view of <b>{roomId}</b></div>
      <div>Message: {message}</div>
      <div>Current Players:</div>
      {playerArray}
      <Player clientSocket={clientSocket} />
      <button onClick={handleLogout}>Leave</button>
    </div>

  )
}

export default Room;

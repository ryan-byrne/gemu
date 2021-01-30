import { React, useState } from 'react';
import Controller from './Controller';
import ErrorPage from '../error/ErrorPage';

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
    const { username, game } = data;
    console.log(game);
    setGameData(game)
  });

  return (
    <div>
      <div>{message}</div>
      {playerArray}
      <Controller clientSocket={clientSocket} username={username} roomId={roomId}/>
    </div>

  )
}

export default Room;

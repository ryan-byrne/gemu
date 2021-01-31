import { React, useState } from 'react';
import Controller from './Controller';
import Player from './Player';

const Room = ({clientSocket, username, roomId, handleLogout, gameState}) => {

  const [message, setMessage] = useState('');
  const [gameData, setGameData] = useState(gameState);

  // TODO: Room freezes up if too many messages are sent

  const playerArray = gameData.active.map(player => {
    if (player.username === username) {}
    else {
      return (
        <Player key={player.id} username={player.username}
          position={{x:player.x, y:player.y}}
          />
      )
    }
  });

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
    setGameData(game)
  });

  return (
    <div>
      <div>{roomId}: {message}</div>
      <button onClick={handleLogout} >Leave</button>
      {playerArray}
      <Controller username={username} roomId={roomId} clientSocket={clientSocket}/>
    </div>

  )
}

export default Room;

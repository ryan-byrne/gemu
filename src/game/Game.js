import { React, useState, useEffect } from 'react';

const Game = ({username, roomId, clientSocket, handleLogout}) => {

  const [players, setPlayers] = useState({});
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({x:0,y:0});


  /*
          Keyboard handling
  */

  const handleKeyPress = (event) => {
    clientSocket.emit('userMove', {roomId:roomId,username:username,position:position});
  }

  // Things to be set each render
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div>{roomId}</div>
      <div>You are: {username}</div>
      <button onClick={handleLogout}>Leave</button>
      <div>{message}</div>
    </div>
  )
}

export default Game;

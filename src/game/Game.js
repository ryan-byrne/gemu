import { React, useState, useEffect } from 'react';

const Game = ({username, roomId, clientSocket, handleLogout}) => {

  /*
          Establish states
  */

  const [players, setPlayers] = useState({});
  const [position, setPosition] = useState({x:0,y:0});

  /*
          SOCKET COMMUNICATION
  */

  // WHen someone joins
  clientSocket.on('joined', (user) => {
    setPlayers({...players, [user]:{x:0,y:0}});
    console.log(user+' has joined');
  });

  // When someone leaves
  clientSocket.on('left', (user) => {
    console.log(user+' has left');
  });

  // When someone moves
  clientSocket.on('move', (data) => {
    console.log(data.username + 'moved to X: '+data.position.x+" Y: "+data.position.y);
  });


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


  /*
          Rendering
  */

  const playerList = []

  for (var player in players) {
    playerList.push(
      <ul>{player.username}</ul>
    )
  }

  return (
    <div>
      <div>{roomId}</div>
      <div>You are: {username}</div>
      {playerList}
      <button onClick={handleLogout}>Leave</button>
    </div>
  )
}

export default Game;

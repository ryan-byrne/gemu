import { useState, useEffect, useCallback } from 'react';

import './style/environment.css';


export default function Environment({client, username, roomId, video, audio, handleMessage}){

  const [remotePlayers, setRemotePlayers] = useState([]);

  const handleJoin = (data) => {
    console.log(data.username + ' joined');
    setRemotePlayers(remotePlayers=>[...remotePlayers, data])
  };

  const handleLeft = useCallback((data) => {
    console.log(data);
  });

  useEffect(() => {
    client.socket.on('joined', (data) => handleJoin(data));
    client.socket.on('left', (data) => handleLeft(data));
    handleMessage('Hello World', 'green')
  }, []);

  return(
    <div className='environmentContainer'>
      <div>Players in {roomId}</div>
        { remotePlayers.map( (player) => <ul>{player.username}, {player.id}</ul> ) }
    </div>
  )
}

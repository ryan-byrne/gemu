import { useState, useEffect, useCallback } from 'react';

import './style/environment.css';
import Controller from './Controller';

export default function Environment({
  client, username, roomId, video, audio, handleMessage, toggleVideo, toggleAudio,
  handleDeviceSelect, size
}){

  const [remotePlayers, setRemotePlayers] = useState([]);
  const [position, setPosition] = useState({});

  const handleJoin = (data) => {
    console.log(data.username + ' joined');
    console.log(data);
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
      <div>{username}'s view of {roomId}</div>
      <div>Players in {roomId}</div>
        { remotePlayers.map( (player) => <ul key={player.id}>{player.username}, {player.id}</ul> ) }
      <Controller toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio}
        video={video} handleDeviceSelect={handleDeviceSelect} size={size}
        setPosition={setPosition}/>
    </div>
  )
}

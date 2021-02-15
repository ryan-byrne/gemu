import { useState, useEffect, useCallback } from 'react';

import './style/environment.css';
import Controller from './Controller';

export default function Environment({
  client, username, roomId, video, audio, handleMessage, toggleVideo, toggleAudio,
  handleDeviceSelect, size, room, handleLogout
}){

  const [players, setPlayers] = useState(client.peers);
  const [position, setPosition] = useState({});

  const handleJoin = (data) => {
    handleMessage(data.message, 'blue');
    setPlayers(data.room.active);
  };

  const handleLeft = (data) => {
    handleMessage(data.message, 'blue');
    setPlayers(data.room.active);
  };

  useEffect(() => {
    client.socket.on('joined', (data) => handleJoin(data));
    client.socket.on('left', (data) => handleLeft(data));
    handleMessage('Successfully joined '+roomId, 'green')
  }, []);

  return(
    <div className='environmentContainer'>
      <div>{username}'s view of {roomId}</div>
      <button onClick={handleLogout}>Leave</button>
      <div>Players in {roomId}</div>
        { players.map( (player) => <ul key={player.id}>{player.username}, {player.id}</ul> ) }
      <Controller toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio}
        video={video} handleDeviceSelect={handleDeviceSelect} size={size}
        setPosition={setPosition}/>
    </div>
  )
}

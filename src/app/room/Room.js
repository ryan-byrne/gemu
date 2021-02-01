import { React, useState } from 'react';
import Controller from './player/Controller';
import Player from './player/Player';

const Room = ({clientSocket, username, roomId, handleLogout, setMessages, messages}) => {

  // TODO: Room freezes up if too many messages are sent

  // WHen someone joins
  clientSocket.on('joined', (user) => {
    setMessages([...messages, {message:user+' has joined',color:'blue'}]);
  });

  // When someone leaves
  clientSocket.on('left', (user) => {
    setMessages([...messages, {message:user+' has left',color:'blue'}]);
  });

  // TODO: Allow for movement to be tracked by others
  // When someone moves
  clientSocket.on('moved', (data) => {
    const { username, game } = data;
  });

  return (
    <div>
      <div>{roomId}</div>
      <button onClick={handleLogout} >Leave</button>
      <Controller username={username} roomId={roomId} clientSocket={clientSocket}/>
    </div>

  )
}

export default Room;

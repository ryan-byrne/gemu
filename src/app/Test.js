import { useEffect } from 'react';

import Naming from './lobby/util/Naming.js';
import Room from './room/Room';
import './room/style/room.css';

const socket = require('socket.io-client')();

export default function Test({media}){

  // Tes App

  const getRandomName = () => {
    var adj = Naming.adjectives[Math.floor(Math.random() * Naming.adjectives.length)];
    var noun = Naming.nouns[Math.floor(Math.random() * Naming.adjectives.length)];
    adj = adj.charAt(0).toUpperCase() + adj.slice(1);
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    return adj+noun;
  };

  const addPlayer = () => {
    const newSocket = require('socket.io-client')();
    newSocket.emit('joinSession', {username:getRandomName(),roomId:'TESTER'})
  }

  const client = {socket:socket, peers:[]}

  useEffect(() => {
    socket.emit('startSession', {username:'Ryan',roomId:'TESTER'})
  },[])

  return(
    <div className='testContainer'>
      <button className='testButton' onClick={addPlayer}>Add Player</button>
      <Room client={client} username='TestPlayer' roomId='TESTER'/>
    </div>
  )
}

import React, { useState, useCallback } from 'react';
import Naming from './util/Naming';
import './style/lobby.css';

import shuffle from './img/shuffle.png';

const Lobby = ({
    username, roomId, handleUserName, handleRoomId, handleStartGame, handleJoinGame
  }) => {

  const [selected, setSelected] = useState(null);

  const handleSelectionChange = (id) => {(id === selected) ? setSelected(null) : setSelected(id);};

  const getRandomRoom = useCallback( event => {
    var result = '';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    handleRoomId(event, result);
  }, [handleRoomId]);

  const getRandomName = useCallback( event => {
    var adj = Naming.adjectives[Math.floor(Math.random() * Naming.adjectives.length)];
    var noun = Naming.nouns[Math.floor(Math.random() * Naming.adjectives.length)];
    adj = adj.charAt(0).toUpperCase() + adj.slice(1);
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    handleUserName(event, adj+noun);
  }, [handleUserName]);

  const mainMenu = (
    <div className='mainMenu'>
      <div className={(selected === 0) ? 'selectedMenuItem' : 'menuItem'}
        onClick={() => handleSelectionChange(0)}>Join a Gemu</div>
      <div className={(selected === 1) ? 'selectedMenuItem' : 'menuItem'}
        onClick={() => handleSelectionChange(1)}>Start a Gemu</div>
    </div>
  );

  var subMenu;
  if (selected === 0) {
    subMenu = (
      <div className='subMenu'>
        <div className='subMenuRow'>
          <input className='menuInput' value={username} type='text'
          id='user' onChange={handleUserName} onBlur={handleUserName}
          placeholder='Your Name'/>
        <img className='randomButton' onClick={getRandomName} src={shuffle} height='20px'/>
        </div>
        <div className='subMenuRow'>
          <input className='menuInput' value={roomId} maxLength={6}
          type='text' id='roomId' onChange={handleRoomId} onBlur={handleRoomId}
          placeholder='Room ID'/>
        </div>
        <button className='menuButton' onClick={handleJoinGame}>Join</button>
      </div>
    )
  }
  else if (selected === 1) {
    subMenu = (
      <div className='subMenu'>
        <div className='subMenuRow'>
          <input className='menuInput' value={username} type='text'
          id='user' onChange={handleUserName} onBlur={handleUserName}
          placeholder='Your Name'/>
        <img className='randomButton' onClick={getRandomName} src={shuffle} height='20px'/>
        </div>
        <div className='subMenuRow'>
          <input id='roomId' className='menuInput' value={roomId} type='text' maxLength={6}
          placeholder='Room ID' onChange={handleRoomId} onBlur={handleRoomId}/>
          <img className='randomButton' onClick={getRandomRoom} src={shuffle} height='20px'/>
        </div>
        <button className='menuButton' onClick={handleStartGame}>Start</button>
      </div>
    )
  }
  else {
    subMenu = (<div></div>)
  }

  return (
    <div className='menuContainer'>
      <div className='menuIcon'></div>
      {mainMenu}
      {subMenu}
    </div>
  )
};

export default Lobby;

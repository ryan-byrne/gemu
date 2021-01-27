import React, { useState, useCallback } from 'react';
import './style/Lobby.css';
import Naming from './util/Naming';

const Lobby = ({
  username, roomId, setRoomId, setUsername, handleStartGame, handleJoinGame
}) => {

  const [selected, setSelected] = useState(null);

  const handleSelectionChange = (id) => {(id === selected) ? setSelected(null) : setSelected(id);};

  const getRandomRoom = useCallback( event => {
    var result = '';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    event.target.parentElement.children[0].className = 'goodSubMenuItem';
    setRoomId(result)
  }, []);

  const getRandomName = useCallback( event => {
    var adj = Naming.adjectives[Math.floor(Math.random() * Naming.adjectives.length)];
    var noun = Naming.nouns[Math.floor(Math.random() * Naming.adjectives.length)];
    adj = adj.charAt(0).toUpperCase() + adj.slice(1);
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    event.target.parentElement.children[0].className = 'goodSubMenuItem';
    setUsername(adj+noun);
  }, []);

  const checkUserName = useCallback( event => {
    if (!event.target.value) {event.target.className = 'badSubMenuItem' }
    else { event.target.className = 'goodSubMenuItem' }
    setUsername(event.target.value)
  }, []);

  const checkRoomId = useCallback( event => {
    if (event.target.value.length < 6) {event.target.className = 'badSubMenuItem' }
    else { event.target.className = 'goodSubMenuItem' }
    setRoomId(event.target.value.toUpperCase());
  }, []);

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
      <div className='joinGame'>
        <div>
          <input className='subMenuItem' value={username} type='text'
          id='userInput' onChange={checkUserName} onBlur={checkUserName}/>
        <button onClick={getRandomName}>Randomize</button>
        </div>
        <div>
          <input className='subMenuItem' value={roomId} maxLength={6}
          type='text' id='roomInput' onChange={checkRoomId} onBlur={checkRoomId}/>
        </div>
        <div><input type='submit' value='Join' onClick={handleJoinGame}/></div>
      </div>
    )
  }
  else if (selected === 1) {
    subMenu = (
      <div className='startGame'>
        <div>
          <input className='subMenuItem' value={username} type='text'
          id='userInput' onChange={checkUserName} onBlur={checkUserName}/>
        <button onClick={getRandomName}>Randomize</button>
        </div>
        <div>
          <input className='subMenuItem' value={roomId} type='text' maxLength={6}
          id='roomInput' onChange={checkRoomId} onBlur={checkRoomId}/>
        <button onClick={getRandomRoom}>Randomize</button>
        </div>
        <div><input type='submit' value='Start' onClick={handleStartGame}/></div>
      </div>
    )
  }
  else {
    subMenu = (<div></div>)
  }

  return (
    <div className='menuContainer'>
      {mainMenu}
      {subMenu}
    </div>
  )
};

export default Lobby;

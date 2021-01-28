import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Naming from './util/Naming';

const JoinGame = ({setRoomId, username, handleUserName, handleJoinGame}) => {

  const roomId = useLocation().pathname.substring(6);

  const getRandomName = useCallback( event => {
    var adj = Naming.adjectives[Math.floor(Math.random() * Naming.adjectives.length)];
    var noun = Naming.nouns[Math.floor(Math.random() * Naming.adjectives.length)];
    adj = adj.charAt(0).toUpperCase() + adj.slice(1);
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    handleUserName(adj+noun);
  }, [handleUserName]);

  useEffect(() => {
    setRoomId(roomId);
  }, [setRoomId]);

  return (
    <div>
      <div>Joining: {roomId}</div>
      <input className='subMenuItem' value={username} type='text'
      id='userInput' onChange={handleUserName} onBlur={handleUserName}>
      </input>
      <button onClick={getRandomName}>Randomize</button>
      <div><input type='submit' value='Join' onClick={handleJoinGame}/></div>
    </div>
  )
}

export default JoinGame;

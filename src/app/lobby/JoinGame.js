import { useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Naming from './util/Naming';
import shuffle from './style/shuffle.png'

const JoinGame = ({setRoomId, username, handleUserName, handleJoinGame, handleLogout}) => {

  const roomId = useLocation().pathname.substring(6);

  const getRandomName = useCallback( event => {
    var adj = Naming.adjectives[Math.floor(Math.random() * Naming.adjectives.length)];
    var noun = Naming.nouns[Math.floor(Math.random() * Naming.adjectives.length)];
    adj = adj.charAt(0).toUpperCase() + adj.slice(1);
    noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    handleUserName(event, adj+noun);
  }, [handleUserName]);

  useEffect(() => {
    setRoomId(roomId);
  }, [setRoomId]);

  return (
    <div className='menuContainer'>
      <h2>Joining {roomId}</h2>
      <div className='subMenu'>
      <input className='menuInput' value={username} type='text'
      id='user' onChange={handleUserName} onBlur={handleUserName}
      placeholder='Your Name'/>
      <img className='randomButton' onClick={getRandomName} src={shuffle}/>
      <div style={{margin:'10px'}}>
        <Link className='menuButton' to='/' style={{marginRight:'10px'}}>Leave</Link>
        <button className='menuButton' onClick={handleJoinGame}>Join</button>
      </div>
      </div>
    </div>
  )
}

export default JoinGame;

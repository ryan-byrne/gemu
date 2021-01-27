import React, { useState, useCallback } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Lobby from './Lobby';
import Room from './Room';

const Gemu = () => {

  // TODO: remove testing values

  const [username, setUsername] = useState('ryan');
  const [roomId, setRoomId] = useState('GGHMHH');
  const [gameState, setGameState] = useState('awaiting-room');

  const handleStartGame = useCallback( event => {
    if ( roomId.length !== 6 ) { }
    else if (!username) { }
    else { setGameState('starting-game') }
  }, []);

  const handleJoinGame = useCallback( event => {
    if ( roomId.length !== 6 ) { }
    else if (!username) { }
    else { setGameState('joining-game')}
  },[]);

  const handleLogout = useCallback(event => {
    setGameState('awaiting-room');
  }, []);

  // Main Pointer according to roomServer

  return (
    <BrowserRouter>
      {gameState === 'awaiting-room' ? <Redirect to={'/'}/> : <Redirect to={roomId}/>}
      <Route exact path='/'>
        <Lobby username={username} roomId={roomId} setUsername={setUsername}
          setRoomId={setRoomId} handleJoinGame={handleJoinGame}
          handleStartGame={handleStartGame}/>
      </Route>
      <Route path={'/'+roomId}>
        <Room username={username} roomId={roomId} gameState={gameState}
          handleLogout={handleLogout}/>
      </Route>
    </BrowserRouter>
  )
}


export default Gemu;

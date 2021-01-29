import React, { useEffect, useState, useCallback, useReducer} from 'react';


const Player = ({clientSocket}) => {

  const [position, setPosition] = useState({x:0,y:0})
  const [keys, setKeys] = useReducer([])

  const keydownListener = useCallback( event => {
    const { key, repeat } = event;
    if (key === 'ArrowUp') {}
  });

  const keyupListener = useCallback( event => {
    const { key, repeat } = event;
  });

  useEffect(() => {
    window.addEventListener('keydown', keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true)
  }, [keydownListener]);

  useEffect(() => {
    window.addEventListener('keyup', keyupListener, true);
    return () => window.removeEventListener("keyup", keyupListener, true)
  }, [keyupListener]);

  return (
    <div>This is me!</div>
  )
}

export default Player;

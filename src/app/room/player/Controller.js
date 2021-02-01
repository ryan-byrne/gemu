import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Player from './Player';

const Controller = ({clientSocket, username, roomId}) => {

  const [dynamics, setDynamics] = useState(
    {x:200,y:0,velX:0,velY:0,speed:2,friction:0.2,keys:[]}
  )
  
  const keyListener = (event) => {
    let start = Date.now();
    var { x, y, velX, velY, speed, friction, keys } = dynamics;
    const typed = event.type === 'keydown' ? true : false
    keys[event.keyCode] = typed;

    let timer = requestAnimationFrame( function update(){
      let interval = Date.now() - start;
      if ( keys[38] ) { if (velY > -speed) { velY-- } }
      if (keys[40]) { if (velY < speed) { velY++ } }
      if (keys[39]) { if (velX < speed) { velX++ } }
      if (keys[37]) { if (velX > -speed) { velX-- } }
      velY *= friction; y += velY; velX *= friction; x += velX;
      if (x >= window.innerWidth) { x = 295 } else if (x <= 5) { x = 5 }
      if (y > window.innerHeight) { y = 295 } else if (y <= 5) { y = 5 }
      clientSocket.emit('move',{username:username,roomId:roomId,position:{x:x,y:y}});
      setDynamics({x:x,y:y,velX:velX,velY:velY,speed:2,friction:0.98,keys:keys});
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  };

  // TODO: Make this less choppy when you add a key
  useEffect(() => {
    window.addEventListener('keyup', keyListener, true);
    window.addEventListener('keydown', keyListener, true);
    return () => {
      window.removeEventListener("keyup", keyListener, true);
      window.removeEventListener('keydown', keyListener, true);
    }
  }, [keyListener]);

  return (

    <Player username={username} position={{x:dynamics.x,y:dynamics.y}} />

  )
}

export default Controller;

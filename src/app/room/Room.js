import { React, useState, useEffect, useCallback } from 'react';
import Player from './Player';

const Room = ({clientSocket, username, roomId, handleLogout, handleMessage}) => {

  const [dynamics, setDynamics] = useState({
    x:200,y:0,velX:0,velY:0,speed:2,friction:0.2,keys:[]
  });
  const height = Math.max(window.innerWidth*3/20, 100)
  const [playerSize, setPlayerSize] = useState({
    height:height, width:height*4/3
  });

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
      //clientSocket.emit('move',{username:username,roomId:roomId,position:{x:x,y:y}});
      setDynamics({x:x,y:y,velX:velX,velY:velY,speed:2,friction:0.98,keys:keys});
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  };

  const handleResize = useCallback((event) => {

    const height = Math.max(window.innerWidth*3/20, 100)
    setPlayerSize({height:height, width:height*4/3});

  }, [setPlayerSize]);

  // Establish event listeners
  useEffect(() => {
    clientSocket.on('joined', (user) => {
      handleMessage(user+' has joined','blue');
    });
    clientSocket.on('left', (user) => {
      handleMessage(user+' has left','blue');
    });

    window.addEventListener('resize', handleResize, true);
    window.addEventListener('keyup', keyListener, true);
    window.addEventListener('keydown', keyListener, true);
    return () => {
      window.removeEventListener("keyup", keyListener, true);
      window.removeEventListener('keydown', keyListener, true);
    }
  }, [keyListener, handleMessage, handleResize]);

  return (
    <div>
      <div className='menuButton' onClick={handleLogout}>Leave</div>
      <Player username={username} playerSize={playerSize}/>
    </div>
  )
}

export default Room;

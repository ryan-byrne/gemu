import { useState, useEffect, useCallback } from 'react';

import Player from './player/Player';

const Connection = ({client, handleMessage}) => {

  const [peers, setPeers] = useState(client.peers);

  const handleJoined = useCallback((data)=> {
    handleMessage(data.username+' has joined','blue');
    setPeers([...peers, data.id]);
  }, [handleMessage, setPeers, peers]);

  const handleLeft = useCallback((data)=> {
    handleMessage(data.username+' has left','blue');
    setPeers(peers.filter(peer=>peer!==data.id))
    console.log(peers);
  }, [handleMessage, setPeers, peers]);

  useEffect(() => {
    client.socket.on('joined', (data) => handleJoined(data));
    client.socket.on('left', (data) => handleLeft(data));
  });

  return (
    <div>
      {peers.map((peer,i)=><div key={i}>{peer}</div>)}
    </div>
  )

}

const Room = ({client, username, roomId, handleLogout, handleMessage}) => {

  const [keys, setKeys] = useState([]);
  const height = Math.max(window.innerWidth*3/20, 125);
  const [player, setPlayer] = useState({
    size:{ height:height, width:height*4/3},
    dynamics:{x:200,y:0,velX:0,velY:0,speed:2,friction:0.2}
  })

  const handleKey = useCallback((event) => {

    if ( event.keyCode < 37 || event.keyCode > 40) { return }

    var {x, y, velY, velX, friction, speed} = player.dynamics;

    let start = Date.now();
    var pressedKeys = keys;
    const typed = event.type === 'keydown' ? true : false
    pressedKeys[event.keyCode] = typed;

    requestAnimationFrame( function update(){
      let interval = Date.now() - start;
      if ( pressedKeys[38] ) { if (velY > -speed) { velY-- } }
      if (pressedKeys[40]) { if (velY < speed) { velY++ } }
      if (pressedKeys[39]) { if (velX < speed) { velX++ } }
      if (pressedKeys[37]) { if (velX > -speed) { velX-- } }
      velY *= friction; y += velY; velX *= friction; x += velX;
      if (x >= window.innerWidth) { x = 295 } else if (x <= 5) { x = 5 }
      if (y > window.innerHeight) { y = 295 } else if (y <= 5) { y = 5 }
      //clientSocket.emit('move',{username:username,roomId:roomId,position:{x:x,y:y}});
      setPlayer({...player, dynamics: {
        x:x,y:y,velX:velX,velY:velY,speed:2,friction:0.98
      }});
      setKeys(pressedKeys);
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  }, [keys, player]);

  const handleResize = useCallback((event) => {

    const height = Math.max(window.innerWidth*3/20, 125)
    setPlayer({...player, size:{
      height:height, width:height*4/3
    }});

  }, [player]);

  useEffect(() => {
    window.addEventListener('keyup', handleKey, true);
    window.addEventListener('keydown', handleKey, true);
    window.addEventListener('resize', handleResize, true);
    return () => {
      window.removeEventListener("keyup", handleKey, true);
      window.removeEventListener('keydown', handleKey, true);
      window.removeEventListener('resize', handleResize, true);
    }
  })

  return (
    <div>
      <div>{roomId}</div>
      <div className='menuButton' onClick={handleLogout}>Leave</div>
      <Connection client={client} handleMessage={handleMessage}/>
      <Player size={player.size}/>
    </div>
  )
}

export default Room;

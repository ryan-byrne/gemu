import { React, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import './style/Participant.css'

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import noface from './img/noface.png';

const Participant = ({username, roomSocket, handleLogout}) => {

  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [position, setPosition] = useState({x:0, y:0});
  const [movement, setMovement] = useState({x:1, y:1})

  const handleKeyPress = (event) => {

    // TODO: Get smoother change of direction

    const { type, keyCode } = event;

    // Update Key States
    if (type==='keydown' && !pressedKeys.includes(keyCode)){
      setPressedKeys(pressedKeys => [...pressedKeys, keyCode])
    } else if (type==='keyup'){
      setPressedKeys(pressedKeys.filter(key => key !==keyCode))
    }

    var x = position.x; var y = position.y;
    var moveX = movement.x; var moveY = movement.y;
    var mx = false; var my = false;

    pressedKeys.map( key => {
      if (key === 38){y+=movement.y;my=true} // Up
      else if (key === 40){y-=movement.y;my=true} // Down
      else if (key === 39){x+=movement.x;mx=true} // Right
      else if (key === 37){x-=movement.x;mx=true} // Left
    });

    if (!mx) {moveX=0} else {moveX++}
    if (!my) {moveY=0} else {moveY++}

    setMovement({x:moveX,y:moveY})
    setPosition({x:x,y:y});

  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="playerContainer" style={{left:position.x,bottom:position.y}}>
      <div className="userName">{username}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Participant;

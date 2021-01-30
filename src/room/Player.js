import React from 'react';
import './style/player.css'

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import noface from './img/noface.png';

const Player = ({username, position}) => {

  return (
    <div className='playerContainer' style={{top:position.y,left:position.x}}>
      <div style={{height:'100px',width:'100px'}}>{username}</div>
    </div>
  )
}

export default Player;

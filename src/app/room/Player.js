import React from 'react';

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import noface from './img/noface.png';

import './style/player.css'

const Player = ({username, playerSize}) => {

  const size = {height:playerSize.height, width:playerSize.width}

  return (
    <div className='playerContainer' style={size}>{username}</div>
  )
}

export default Player;

import {useState, useCallback, useEffect} from 'react';

import './style/controller.css';

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';

export default function Controller(
  {toggleAudio, toggleVideo, audio, video, setPosition}){

  const [keys, setKeys] = useState([]);
  const [dynamics, setDynamics] = useState({x:0,y:0,velX:0,velY:0,speed:2,friction:0.2})
  const [select, setSelect] = useState(null);

  var selecting = false;

  const handleKey = (event) => {

    if (![37,38,39,40,65,87,68,83].includes(event.keyCode)) { return }

    var {x, y, velY, velX, friction, speed} = dynamics;

    let start = Date.now();
    var pressedKeys = keys;
    const typed = event.type === 'keydown' ? true : false
    pressedKeys[event.keyCode] = typed;

    requestAnimationFrame( function update(){
      let interval = Date.now() - start;
      if (pressedKeys[38]||pressedKeys[87] ) { if (velY > -speed) { velY-- } }
      if (pressedKeys[40]||pressedKeys[83]) { if (velY < speed) { velY++ } }
      if (pressedKeys[39]||pressedKeys[68]) { if (velX < speed) { velX++ } }
      if (pressedKeys[37]||pressedKeys[65]) { if (velX > -speed) { velX-- } }
      velY *= friction; y += velY; velX *= friction; x += velX;
      setDynamics({x:x,y:y,velX:velX,velY:velY,speed:2,friction:0.98});
      setKeys(pressedKeys);
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  };

  const handleMouseUp = (event) => {

    // TODO: actually change devices

    if (select) { console.log(event) }
    selecting = false;
    setSelect(null);
  };

  const handleMouseDown = (event) => {

    const { id } = event.target;

    if (id === 'videoSwitch' || id === 'audioSwitch') {
      setTimeout(() => {
        if (selecting) { setSelect(id) }
        else { (id === 'videoSwitch') ? toggleVideo() : toggleAudio() }
      }, 250);
      selecting = true;
    }

  };

  // TODO: Event handlers for touch events

  const startup = () => {
    window.addEventListener('keyup', handleKey, true);
    window.addEventListener('keydown', handleKey, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('ondragstart', () => {return}, true);
  }

  const cleanup = () => {
    window.removeEventListener("keyup", handleKey, true);
    window.removeEventListener('keydown', handleKey, true);
    window.removeEventListener('mousedown', handleMouseDown, true);
    window.removeEventListener('mouseup', handleMouseUp, true);
    window.removeEventListener('ondragstart', () => {return}, true);
  }

  useEffect(() => { startup(); return () => cleanup() }, [])

  const selectAudio = (
    <div className='deviceList'>
      { audio.devices.map( (device) =>
        <ul id={device.deviceId} key={device.deviceId} className='audioDevices'>{device.label}</ul> ) }
    </div>
  )

  const selectVideo = (
    <div className='deviceList'>
      { video.devices.map( (device) =>
        <ul id={device.deviceId} key={device.deviceId} className='videoDevices'>{device.label}</ul> ) }
    </div>
  )

  return(
    <div className="controllerContainer">
      <img draggable='false' id="audioSwitch" className='mediaButton'
        onDrag={()=>{return}} src={audio.stream ? mute : unmute}></img>
      { select === 'audioSwitch' ? selectAudio : null }
      <img draggable='false' id="videoSwitch" className='mediaButton'
        onDrag={()=>{return}} src={video.stream ? vid : unvid}></img>
      { select === 'videoSwitch' ? selectVideo : null }
    </div>
  )

}

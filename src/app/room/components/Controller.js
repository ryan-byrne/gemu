import {useState, useCallback, useEffect} from 'react';

import './style/controller.css';

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import share from './img/share.png';

export default function Controller(
  {toggleAudio, toggleVideo, audio, video, setPosition, size, handleDeviceSelect}){

  const [selected, setSelected] = useState(null);
  var dynamics = {x:0,y:0,velX:0,velY:0,speed:2,friction:0.2}
  var keys = []
  var holding;

  const handleKey = (event) => {

    if (![37,38,39,40,65,87,68,83].includes(event.keyCode)) { return }

    var {x, y, velY, velX, friction, speed} = dynamics;

    let start = Date.now();
    var pressedKeys = keys;
    const typed = event.type === 'keydown' ? true : false
    pressedKeys[event.keyCode] = typed;

    // TODO: avoid state changes

    requestAnimationFrame( function update(){
      let interval = Date.now() - start;
      if (pressedKeys[38]||pressedKeys[87] ) { if (velY > -speed) { velY-- } }
      if (pressedKeys[40]||pressedKeys[83]) { if (velY < speed) { velY++ } }
      if (pressedKeys[39]||pressedKeys[68]) { if (velX < speed) { velX++ } }
      if (pressedKeys[37]||pressedKeys[65]) { if (velX > -speed) { velX-- } }
      velY *= friction; y += velY; velX *= friction; x += velX;
      dynamics = {x:x,y:y,velX:velX,velY:velY,speed:10,friction:0.2}
      setPosition({x:x,y:y})
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  };

  const handleMouseUp = (event) => {

    const { tagName, id, className, textContent } = event.target;

    if ( holding && tagName==='UL' ) { handleDeviceSelect(textContent, className, id) }
    holding = false;
    setSelected(null);
  }

  const handleMouseDown = (event) => {

    const { id } = event.target;

    if (id === 'videoSwitch' || id === 'audioSwitch') {
      setTimeout(() => {
        if ( holding ) { setSelected(id) }
        else { (id === 'videoSwitch') ? toggleVideo() : toggleAudio() }
      }, 250);
      holding = true;
    }

  };

  // TODO: Event handlers for touch events

  useEffect(() => {
    window.addEventListener('keyup', handleKey, true);
    window.addEventListener('keydown', handleKey, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('ondragstart', () => {return}, true);
    return () => {
      window.removeEventListener("keyup", handleKey, true);
      window.removeEventListener('keydown', handleKey, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('ondragstart', () => {return}, true);
    }}, [])

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

  // TODO: Make te share button functional

  return(
    <div className="controllerContainer" style={size}>
      <div className='mediaButtonRow'>
        <img draggable='false' id="audioSwitch" className='mediaButton'
          onDrag={()=>{return}} src={audio.stream ? mute : unmute}/>
      </div>
      { selected === 'audioSwitch' ? selectAudio : null }
      <div className='mediaButtonRow'>
        <img draggable='false' id="videoSwitch" className='mediaButton'
          onDrag={()=>{return}} src={video.stream ? vid : unvid}></img>
      </div>
      <div className='mediaButtonRow'>
        <img draggable='false' id="shareButton" className='mediaButton'
          onDrag={()=>{return}} src={share}></img>
      </div>
      { selected === 'videoSwitch' ? selectVideo : null }
    </div>
  )

}

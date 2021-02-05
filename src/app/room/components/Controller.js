import {useState, useCallback, useEffect} from 'react';

import './style/controller.css';

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import arrow from './img/arrow.png';


export default function Controller(
  {setPlayerGeometry, playerGeometry, toggleAudio, toggleVideo, audio, video}){

  const [keys, setKeys] = useState([]);
  const [dynamics, setDynamics] = useState({
    x:200,y:0,velX:0,velY:0,speed:2,friction:0.2
  })
  const [select, setSelect] = useState(null);

  var selecting = false;

  const handleKey = useCallback((event) => {

    if ( event.keyCode < 37 || event.keyCode > 40) { return }

    var { x, y } = playerGeometry.position;

    var {velY, velX, friction, speed} = dynamics;

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
      setDynamics({velX:velX,velY:velY,speed:2,friction:0.98});
      setPlayerGeometry({...playerGeometry, position:{x:x,y:y}})
      setKeys(pressedKeys);
      if (interval < 2000 ) { requestAnimationFrame(update) }
    });

  }, [playerGeometry, dynamics, keys, setPlayerGeometry]);

  const handleResize = useCallback((event) => {

    const height = Math.max(window.innerWidth*3/20, 125)
    setPlayerGeometry({...playerGeometry, size:{
      height:height, width:height*4/3
    }});

  },[setPlayerGeometry, playerGeometry]);

  const handleSelectVideo = useCallback((event) => {

  });

  const handleSelectAudio = useCallback((event) => {

  });

  const handleMouseUp = useCallback((event) => {
    if (select) {console.log(event.target.className, event.target.id)}
    selecting = false;
    setSelect(null);
  });

  const handleMouseDown = useCallback((event) => {

    const { id } = event.target;

    if (id === 'videoSwitch' || id === 'audioSwitch') {
      setTimeout(() => {
        if (selecting) { setSelect(id) }
        else { (id === 'videoSwitch') ? toggleVideo() : toggleAudio() }
      }, 250);
      selecting = true;
    }

  });

  // TODO: Event handlers for touch events

  useEffect(() => {
    window.addEventListener('keyup', handleKey, true);
    window.addEventListener('keydown', handleKey, true);
    window.addEventListener('resize', handleResize, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('ondragstart', () => {return}, true);
    return () => {
      window.removeEventListener("keyup", handleKey, true);
      window.removeEventListener('keydown', handleKey, true);
      window.removeEventListener('resize', handleResize, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('ondragstart', () => {return}, true);

    }
  })

  const selectAudio = (
    <div className='deviceList'>
      { audio.devices.map( (device) =>
        <ul id={device.deviceId} key={device.deviceId} className='audioDevices'>{device.label}</ul> ) }
    </div>
  )

  const selectVideo = (
    <div className='deviceList'>
      { video.devices.map( (device) =>
        <ul id={device.deviceId} key={device.deviceId} className='audioDevices'>{device.label}</ul> ) }
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

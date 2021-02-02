import { useRef, useEffect, useState, useCallback } from 'react';

import './style/player.css';
import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import noface from './img/noface.png';
import arrow from './img/arrow.png';

const Player = ({size}) => {

  const [media, setMedia] = useState({
    video:{track:null,selecting:false,id:''},
    audio:{track:null,selecting:false,id:''}
  });
  const [devices, setDevices] = useState({video:[],audio:[]})

  const videoRef = useRef();
  const audioRef = useRef();

  const stopAudio = () => {
    media.audio.track.forEach((track)=> track.stop())
    setMedia({...media,audio:{...media.audio, track:null}})
  }

  const stopVideo = () => {
    media.video.track.forEach((track)=> track.stop())
    setMedia({...media,video:{...media.video, track:null}})
  }

  const toggleAudio = useCallback((event) => {
    if ( !media.audio.track ) { getAudioStream() }
    else { stopAudio() }
  });

  const toggleVideo = useCallback((event) => {
    if ( !media.video.track ) { getVideoStream() }
    else { stopVideo() }
  });

  const toggleVideoSelect = useCallback((event) => {
    setMedia({...media, video:{
      ...media.video, selecting:!media.video.selecting
    }});
  });

  const toggleAudioSelect = useCallback((event) => {
    setMedia({...media, audio:{
      ...media.audio, selecting:!media.audio.selecting
    }});
  });

  const changeAudioSource = useCallback((event) => {
    stopAudio();
    getAudioStream(event.target.value);
  });

  const changeVideoSource = useCallback((event) =>{
    stopVideo();
    getVideoStream(event.target.value);
  });

  const getVideoStream = async (deviceId) => {
    const constraints = deviceId ? {video:{deviceId:{exact:deviceId}}} : {video:true}
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setMedia({...media,video:{
      ...media.video,
      track:stream.getVideoTracks()
    }});
    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
  }

  const getAudioStream = async (deviceId) => {
    const constraints = deviceId ? {audio:{deviceId:{exact:deviceId}}} : {audio:true}
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setMedia({...media,audio:{
      ...media.audio,
      track:stream.getAudioTracks()
    }});
  }

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    setDevices({
      video:devices.filter(device=>device.kind==='videoinput'),
      audio:devices.filter(device=>device.kind==='audioinput')
    })
  }

  useEffect(()=> {
    getVideoStream();
    getDevices();
  }, []);

  const audioPopout = (
    <select className='selectMenu' onChange={changeAudioSource}>
      {devices.audio.map(device => <option value={device.deviceId}>{device.label}</option>)}
    </select>
  )

  const videoPopout = (
    <select className='selectMenu' onChange={changeVideoSource}>
      {devices.video.map(device => <option value={device.deviceId}>{device.label}</option>)}
    </select>
  )

  return (
    <div className='playerContainer'>
      <div className="mediaButtonContainer">
        <div className='mediaButtonRow'>
          <div className='popoutSelect'>{media.audio.selecting?audioPopout:null}</div>
          <img className='arrowButton' src={arrow} onClick={toggleAudioSelect}/>
          <img className='mediaButtons' src={media.audio.track?mute:unmute}
            onClick={toggleAudio}/>
        </div>
        <div className='mediaButtonRow'>
          <div className='popoutSelect'>{media.video.selecting?videoPopout:null}</div>
          <img className='arrowButton' src={arrow} onClick={toggleVideoSelect}/>
          <img className='mediaButtons' src={media.video.track?vid:unvid}
            onClick={toggleVideo}/>
        </div>
      </div>
      { !media.video.track ?
        <img style={{height:size.height,width:size.width}} src={noface}></img> :
          <video style={{height:size.height,width:size.width}} ref={videoRef}>Webcam</video> }
    </div>
  )

}

export default Player;

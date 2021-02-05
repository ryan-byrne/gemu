import { useRef, useEffect, useState, useCallback } from 'react';

import './style/player.css';

import noface from './img/noface.png';

import AudioVisualizer from './AudioVisualizer';
/*
const Player2 = ({stream, size, username}) => {

  const [media, setMedia] = useState({
    video:{stream:null,selecting:false,id:null},
    audio:{stream:null,selecting:false,id:null}
  });
  const [devices, setDevices] = useState({video:[],audio:[]})

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const stopAudio = () => {
    if ( !media.audio.stream ) {return}
    media.audio.stream.getAudioTracks().forEach((track)=> track.stop())
    setMedia({...media,audio:{...media.audio, stream:null}})
  }

  const stopVideo = () => {
    if ( !media.video.stream ) {return}
    media.video.stream.getVideoTracks().forEach((track)=> track.stop())
    setMedia({...media,video:{...media.video, stream:null}})
  }

  const toggleAudio = useCallback((event) => {
    if ( !media.audio.stream ) { getAudioStream() }
    else { stopAudio() }
  });

  const toggleVideo = useCallback((event) => {
    if ( !media.video.stream ) { getVideoStream() }
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
    setMedia({...media,video:{...media.video,stream:stream}});
    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
  }

  const getAudioStream = async () => {
    const constraints = media.audio.id ? {audio:{deviceId:{exact:media.audio.id}}} : {audio:true}
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setMedia({...media,audio:{...media.audio,stream:stream}});
  }

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    setDevices({
      video:devices.filter(device=>device.kind==='videoinput'),
      audio:devices.filter(device=>device.kind==='audioinput')
    })
  }

  useEffect(()=> {
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
    <div className='playerContainer' style={{height:size.height,width:size.width}}>
      <div className="mediaButtonContainer">
        <div className='mediaButtonRow'>
          <div className='popoutSelect'>{media.audio.selecting?audioPopout:null}</div>
          <img className='arrowButton' src={arrow} onClick={toggleAudioSelect}/>
          <img className='mediaButtons' src={media.audio.stream?mute:unmute}
            onClick={toggleAudio}/>
        </div>
        <div className='mediaButtonRow'>
          <div className='popoutSelect'>{media.video.selecting?videoPopout:null}</div>
          <img className='arrowButton' src={arrow} onClick={toggleVideoSelect}/>
          <img className='mediaButtons' src={media.video.stream?vid:unvid}
            onClick={toggleVideo}/>
        </div>

      </div>

      { media.video.stream ?
        <video className="webcamContainer" style={{height:size.height,width:size.width}}
          ref={videoRef}>Webcam</video> :
        <img className="webcamContainer" style={{height:size.height,width:size.width}}
          src={noface}/>
      }

      { media.audio.stream ?
        <AudioVisualizer className='audioVisualizer' size={size} audioStream={media.audio.stream}/>
        : null
      }

    </div>
  )

}
*/

export default function Player({size, audio, video}) {

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const {height, width} = size;

  const dummyVideo = (
    <div className='webcamContainer'style={{height:height, width:width, backgroundColor:'black'}}></div>
  )

  const camVideo = (
      <video className='webcamContainer' style={{height:height, width:width}}
        ref={videoRef}>
      </video>
  )

  return (
    <div className='playerContainer'>
      {video.stream ? camVideo : dummyVideo }
      {audio.stream ? <AudioVisualizer audioStream={audio.stream} size={size}/> : null}
    </div>
  )
}

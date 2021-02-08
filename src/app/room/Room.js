import {useState, useEffect, useCallback, useRef} from 'react';

import Player from './components/Player';
import Controller from './components/Controller';
import Environment from './components/Environment';

const getScale = () => {
  const { innerHeight, innerWidth } = window;
  return innerHeight/4 > innerWidth/3 ? {width:innerWidth/3} : {height:innerHeight/4}
}

export default function Room({client, roomId, username, handleLogout, handleMessage}) {

  // Test Room

  const [audio, setAudio] = useState({stream:null,id:null,devices:[],on:false});
  const [video, setVideo] = useState({stream:null,id:null,devices:[],on:false});
  const videoOn = useRef(video.stream);
  const audioOn = useRef(audio.stream);
  const [size, setSize] = useState( getScale() );
  const [position, setPosition] = useState({x:0,y:0})

  const getDevices = () => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices)=>{
        setAudio(
          (prevAudio)=>({...prevAudio, devices:devices.filter(device=>device.kind === 'audioinput')})
        )
        setVideo(
          (prevVideo)=>({...prevVideo,devices:devices.filter(device=>device.kind === 'videoinput')})
        )
      })
      .catch((err)=>console.log(err))
  }

  const startVideo = (deviceId) => {
    const constraints = deviceId ? {deviceId:deviceId} : true
    navigator.mediaDevices.getUserMedia({video:constraints})
      .then( (stream) => setVideo((prevVideo)=>({...prevVideo, stream:stream})))
      .catch((err)=>console.log(err))
  };

  const startAudio = (deviceId) => {
    const constraints = deviceId ? {deviceId:deviceId} : true
    navigator.mediaDevices.getUserMedia({audio:constraints})
      .then( (stream) => setAudio((prevAudio)=>({...prevAudio, stream:stream})))
      .catch((err)=>console.log(err))
  };

  const stopAudio = () => {
    if (!audioOn.current) {return}
    audioOn.current.getAudioTracks().map( (track) => track.stop() );
    setAudio((prevAudio)=>({...prevAudio, stream:null}));
  };

  const stopVideo = () => {
    if (!videoOn.current) {return}
    videoOn.current.getVideoTracks().map( track => track.stop() );
    setVideo((prevVideo)=>({...prevVideo, stream:null}));
  };

  const toggleVideo = () => {
    videoOn.current ? stopVideo() : startVideo()
  };

  const toggleAudio = () => {
    audioOn.current ? stopAudio() : startAudio()
  };

  const handleResize = (event) => setSize( getScale() )

  const handleDeviceSelect = (name, type, id) => {

    if (type === 'videoDevices') {
      stopVideo();
      handleMessage('Video Device switched to '+name)
      startVideo(id);
    }
    else if (type === 'audioDevices') {
      stopAudio();
      handleMessage('Audio Device switched to '+name)
      startAudio(id);
    }

  };

  const cleanup = () => {

    console.log('cleanup');

    window.removeEventListener('resize', handleResize, true);

    if (video.stream) {
      video.stream.getVideoTracks().forEach((track)=> track.stop())
    }
    if (audio.stream) {
      audio.stream.getAudioTracks().forEach((track)=> track.stop())
    }
  }

  const startup = () => {

    window.addEventListener('resize', handleResize, true);
    getDevices();
  }

  useEffect(() => { startup(); return () => cleanup() },[]);
  useEffect(() => { videoOn.current = video.stream}, [video]);
  useEffect(() => { audioOn.current = audio.stream}, [audio]);

  return (
    <div className='roomContainer'>
      <div onClick={handleLogout}>Leave</div>
      <Environment client={client} username={username} localAudio={audio} localVideo={video}
        roomId={roomId} handleMessage={handleMessage} size={size} position={position}/>
      <div className='localPlayerContainer'>
        <Controller toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio}
          video={video} handleDeviceSelect={handleDeviceSelect} setPosition={setPosition} />
        <Player audioStream={audio.stream} videoStream={video.stream} size={size}
          username={username}/>
      </div>
    </div>
  )

}

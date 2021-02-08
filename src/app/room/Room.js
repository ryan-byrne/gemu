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
  const videoOn = useRef(video);
  const audioOn = useRef(audio);
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

    console.log(deviceId, videoOn.current.id);

    var id;var constraints;
    if (deviceId){constraints={deviceId:deviceId};id=deviceId }
    else if (videoOn.current.id){constraints={deviceId:videoOn.current.id};id=videoOn.current.id }
    else {constraints=true;id=videoOn.current.id}

    navigator.mediaDevices.getUserMedia({video:constraints})
      .then( (stream) => setVideo((prevVideo)=>({...prevVideo, stream:stream,id:id})))
      .catch((err)=>console.log(err))

  };

  const startAudio = (deviceId) => {

    var id;var constraints;
    if (deviceId){constraints={deviceId:deviceId};id=deviceId }
    else if (audioOn.current.id){constraints={deviceId:audioOn.current.id};id=audioOn.current.id }
    else {constraints=true;id=audioOn.current.id}

    navigator.mediaDevices.getUserMedia({audio:constraints})
      .then( (stream) => setAudio((prevAudio)=>({...prevAudio, stream:stream, id:id})))
      .catch((err)=>console.log(err))
  };

  const stopAudio = () => {
    if (!audioOn.current.stream) {return}
    audioOn.current.stream.getAudioTracks().map( (track) => track.stop() );
    setAudio((prevAudio)=>({...prevAudio, stream:null}));
  };

  const stopVideo = () => {
    if (!videoOn.current.stream) {return}
    videoOn.current.stream.getVideoTracks().map( track => track.stop() );
    setVideo((prevVideo)=>({...prevVideo, stream:null}));
  };

  const toggleVideo = () => {
    videoOn.current.stream ? stopVideo() : startVideo()
  };

  const toggleAudio = () => {
    audioOn.current.stream ? stopAudio() : startAudio()
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
  useEffect(() => { videoOn.current = video}, [video]);
  useEffect(() => { audioOn.current = audio}, [audio]);

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

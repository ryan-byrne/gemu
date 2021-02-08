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

  const startVideo = () => {

    console.log('Starting video');

    const constraints = video.id ? {deviceId:video.id} : true

    navigator.mediaDevices.getUserMedia({video:constraints})
      .then( (stream) => setVideo((prevVideo)=>({...prevVideo, stream:stream})))
      .catch((err)=>console.log(err))

  };

  const startAudio = () => {

    console.log('Starting audio');

    const constraints = audio.id ? {deviceId:audio.id} : true

    navigator.mediaDevices.getUserMedia({audio:constraints})
      .then( (stream) => setAudio({...audio, stream:stream}))
      .catch((err)=>console.log(err))

  };

  const stopAudio = () => {
    audioOn.current.getAudioTracks().map( (track) => track.stop() );
    setAudio((prevAudio)=>({...prevAudio, stream:null}));
  };

  const stopVideo = () => {
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

  const handleDeviceSelect = (className, id) => {

    if (className === 'videoDevices') {
      console.log(video);
      console.log('video', id);
    }
    else if (className === 'audioSelect') {
      console.log('audio', id);
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
      <Environment client={client} username={username} audio={audio} video={video}
        roomId={roomId} handleMessage={handleMessage} />
      <div className='localPlayerContainer'>
        <Controller toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio}
          video={video} handleDeviceSelect={handleDeviceSelect} setPosition={setPosition} />
        <Player audioStream={audio.stream} videoStream={video.stream} size={size}
          username={username}/>
      </div>
    </div>
  )

}

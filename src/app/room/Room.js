import {useState, useEffect, useCallback} from 'react';

import Player from './components/Player';
import Controller from './components/Controller';
import Environment from './components/Environment';

const getScale = () => {
  const { innerHeight, innerWidth } = window;
  return innerHeight/4 > innerWidth/3 ? {width:innerWidth/3} : {height:innerHeight/4}
}

export default function Room({client, roomId, username, handleLogout, handleMessage}) {

  // Test Room

  const [audio, setAudio] = useState({stream:null,id:null,devices:[]});
  const [video, setVideo] = useState({stream:null,id:null,devices:[]});
  const [size, setSize] = useState( getScale() );
  const [position, setPosition] = useState({x:0,y:0})

  const startVideo = async () => {

    console.log('starting video');

    const constraints = video.id ? {deviceId:video.id} : true
    const stream = await navigator.mediaDevices.getUserMedia({video:constraints})
    const devices = await navigator.mediaDevices.enumerateDevices()

    setVideo({
      stream:stream,
      devices:devices.map(device => device.kind === 'videoinput'),
      id:stream.id
    })

  };

  const startAudio = async () => {

    console.log('Starting audio');


    const constraints = audio.id ? {deviceId:audio.id} : true
    const stream = await navigator.mediaDevices.getUserMedia({audio:constraints})
    const devices = await navigator.mediaDevices.enumerateDevices()

    setAudio({
      stream:stream,
      devices:devices.map(device => device.kind === 'audioinput'),
      id:stream.id
    })

  };

  const stopAudio = async () => {

    console.log('Stopping Audio');

    if (!audio.stream) { return } // Already stopped
    const tracks = await audio.stream.getAudioTracks()
    tracks.forEach((track)=> track.stop())
    setAudio({...audio, stream:null});
  };

  const stopVideo = async () => {

    console.log('Stopping Video');

    if (!video.stream) { return } // Already stopped
    const tracks = await video.stream.getVideoTracks()
    tracks.forEach((track)=> track.stop())
    setVideo({...video, stream:null});
  };

  const toggleVideo = () => video.stream ? stopVideo() : startVideo();

  const toggleAudio = () => audio.stream ? stopAudio() : startAudio()

  const handleResize = (event) => setSize( getScale() )

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
    
  }

  useEffect(() => { startup(); return () => cleanup() },[]);

  return (
    <div className='roomContainer'>
      <div onClick={handleLogout}>Leave</div>
      <Environment client={client} username={username} audio={audio} video={video}
        roomId={roomId} handleMessage={handleMessage} />
      <div className='localPlayerContainer'>
        <Controller toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio}
          video={video} setPosition={setPosition}/>
        <Player audioStream={audio.stream} videoStream={video.stream} size={size} username={username}/>
      </div>
    </div>
  )

}

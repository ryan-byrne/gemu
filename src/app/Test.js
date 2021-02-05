import {useRef, useState, useEffect, useCallback} from 'react';

import Player from './room/components/Player';
import Controller from './room/components/Controller';

export default function Test() {

  // Test Room

  const [audio, setAudio] = useState({stream:null,id:null,devices:[]});
  const [video, setVideo] = useState({stream:null,id:null,devices:[]});
  const height = Math.max(window.innerWidth*3/20, 125);
  const [playerGeometry, setPlayerGeometry] = useState({
    size:{ height:height, width:height*4/3}, position:{x:0,y:0}
  })

  const startVideo = () => {

    const constraints = video.id ? {deviceId:video.id} : true

    navigator.mediaDevices.getUserMedia({video:constraints})
      .then((stream)=>{
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            setVideo({
              stream:stream,
              devices:devices.filter(d=> d.kind === 'videoinput'),
              id:stream.id
            });
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))

  };

  const startAudio = () => {

    const constraints = audio.id ? {deviceId:audio.id} : true

    navigator.mediaDevices.getUserMedia({audio:constraints})
      .then((stream)=>{
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            setAudio({stream:stream, devices:devices.filter(d=> d.kind === 'audioinput')});
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))

  };

  const stopAudio = async () => {
    if (!audio) { return } // Already stopped
    await audio.stream.getAudioTracks().forEach((track)=> track.stop())
    setAudio({...audio, stream:null});
  };

  const stopVideo = async () => {
    if (!video) { return } // Already stopped
    await video.stream.getVideoTracks().forEach((track)=> track.stop())
    setVideo({...video, stream:null});
  };

  const toggleVideo = () => {
    video.stream ? stopVideo() : startVideo();
  }

  const toggleAudio = () => {
    audio.stream ? stopAudio() : startAudio();
  }

  const cleanup = () => {

    if (video.stream) {
      video.stream.getVideoTracks().forEach((track)=> track.stop())
    }
    if (audio.stream) {
      audio.stream.getAudioTracks().forEach((track)=> track.stop())
    }
  }

  useEffect(() => { startVideo(); startAudio() }, []); // Start video on open
  useEffect(() => { return () => cleanup() } , [video, audio]); // Clearmedia each remount

  return (
    <div>
      <div className='localPlayerContainer'>
        <Controller playerGeometry={playerGeometry} setPlayerGeometry={setPlayerGeometry}
          toggleAudio={toggleAudio} toggleVideo={toggleVideo} audio={audio} video={video} />
        <Player audio={audio} video={video} username='Local Player' size={playerGeometry.size}/>
      </div>
    </div>
  )

}

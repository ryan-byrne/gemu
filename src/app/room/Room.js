import { useState, useEffect, useCallback } from 'react';

import Player from './components/Player';
import Controller from './components/Controller';

import './style/room.css';

const Connection = ({client, handleMessage}) => {

  const [peers, setPeers] = useState(client.peers);

  const handleJoined = useCallback((data)=> {
    handleMessage(data.username+' has joined','blue');
    setPeers([...peers, data.id]);
  }, [handleMessage, setPeers, peers]);

  const handleLeft = useCallback((data)=> {
    handleMessage(data.username+' has left','blue');
    setPeers(peers.filter(peer=>peer!==data.id))
  }, [handleMessage, setPeers, peers]);

  useEffect(() => {
    client.socket.on('joined', (data) => handleJoined(data));
    client.socket.on('left', (data) => handleLeft(data));
  });

  return (
    <div>
      {peers.map((peer,i)=><div key={i}>{peer}</div>)}
    </div>
  )

}

export default function Room(
  {client, username, roomId, handleLogout, handleMessage}){

  const [media, setMedia] = useState({
    video:{stream:null,selecting:false,id:null,devices:[]},
    audio:{stream:null,selecting:false,id:null,devices:[]}
  });
  const height = Math.max(window.innerWidth*3/20, 125);
  const [playerGeometry, setPlayerGeometry] = useState({
    size:{ height:height, width:height*4/3}, position:{x:0,y:0}
  })

  const startVideo = () => {

    const constraints = media.video.id ? {deviceId:media.video.id} : true

    navigator.mediaDevices.getUserMedia({video:constraints})
      .then((stream)=>{
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            setMedia({...media,
              video:{
                ...media.video,
                stream:stream,
                devices:devices.filter(d=> d.kind === 'videoinput')
              }
            });
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))

  };

  const startAudio = () => {

    const constraints = media.audio.id ? {deviceId:media.audio.id} : true

    navigator.mediaDevices.getUserMedia({audio:constraints})
      .then((stream)=>{
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            setMedia({...media,
              audio:{
                ...media.audio,
                stream:stream,
                devices:devices.filter(d=> d.kind === 'audioinput')
              }
            });
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))

  };

  const stopAudio = async () => {
    if (!media.audio.stream) { return }
    await media.audio.stream.getAudioTracks().forEach((track)=> track.stop())
    setMedia({...media,audio:{...media.audio, stream:null}});
  };

  const stopVideo = async () => {
    if (!media.video.stream) { return }
    await media.video.stream.getVideoTracks().forEach((track)=> track.stop())
    setMedia({...media,video:{...media.video, stream:null}});
  };

  const selectVideoDevice = useCallback((event) => {
    stopVideo();
    setMedia({...media, video:{...media.video, id:event.taget.value}});
    startVideo();
  },[setMedia,media,startVideo,stopVideo]);

  const selectAudioDevice = useCallback((event) => {
    stopAudio();
    setMedia({...media, audio:{...media.audio, id:event.taget.value}});
    getAudioStream();
  });

  const toggleVideo = (event) => {
    media.video.stream ? stopVideo() : startVideo();
  }

  const toggleAudio = (event) => {
    media.audio.stream ? stopAudio() : getAudioStream();
  }

  const cleanup = () => {
    if (media.video.stream) {
      media.video.stream.getVideoTracks().forEach((track)=> track.stop())
    }
    if (media.audio.stream) {
      media.audio.stream.getAudioTracks().forEach((track)=> track.stop())
    }
  }

  useEffect(() => { startVideo() }, []); // Start video on open
  useEffect(() => { return () => cleanup() } , [media]); // Clearmedia each remount

  // TODO: Create menu to leave, invite, etc.
  return (
    <div className='roomContainer'>
      <div>{roomId}</div>
      <div className='menuButton' onClick={handleLogout}>Leave</div>
      <Controller setPlayerGeometry={setPlayerGeometry} playerGeometry={playerGeometry}/>
      <div className='localPlayerContainer'>
        <Player size={playerGeometry.size} media={media} toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}/>
      </div>
    </div>
  )
}

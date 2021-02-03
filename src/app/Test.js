import {useRef, useState, useEffect} from 'react';
import AudioVisualizer from './room/player/AudioVisualizer';

const Test = () => {

  const [audio, setAudio] = useState(null);

  const getAudioStream = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const deviceId = devices.filter(device => device.label === 'MacBook Air Microphone')[0]
    const stream = await navigator.mediaDevices.getUserMedia({
      audio:{deviceId:deviceId}
    });
    setAudio(stream);
  }

  useEffect(() => {
    getAudioStream();
  },[]);

  return (
    <div>
      {audio?<AudioVisualizer audioStream={audio} size={{height:100,width:300}}/>:null}
    </div>
  )

}

export default Test;

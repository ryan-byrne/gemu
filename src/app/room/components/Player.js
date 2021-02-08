import { useRef, useEffect} from 'react';

import './style/player.css';

import AudioVisualizer from './AudioVisualizer';

export default function Player({audioStream, videoStream, size, username}) {

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if ( video ) { video.srcObject = videoStream;video.play() }
  }, [videoStream]);

  return (
    <div className='playerContainer' style={size}>
      { videoStream ?
          <video className='webcamContainer' ref={videoRef}> </video> :
            <div className='nofaceContainer'></div>
       }
      {audioStream ? <AudioVisualizer audioStream={audioStream} size={size}/> : null}
    </div>
  )
}

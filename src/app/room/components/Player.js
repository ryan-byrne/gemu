import { useRef, useEffect, useState, useCallback } from 'react';

import './style/player.css';

import AudioVisualizer from './AudioVisualizer';

export default function Player({audioStream, videoStream}) {

  const height = Math.max(window.innerWidth*3/20, 125)
  const [size, setSize] = useState({height:height, width:height*4/3});

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const handleResize = useCallback((event) => {
    const height = Math.min(window.innerHeight/4, window.innerWidth/3)
    setSize({height:height,width:height*4/3})
  });


  useEffect(()=>{
    console.log('player use effect');
    window.addEventListener('resize', handleResize, true)
    return () => window.removeEventListener('resize', handleResize, true)
  }, []);

  useEffect(() => {
    let video = videoRef.current;
    if (video && videoStream) { video.srcObject = videoStream }
  })

  return (
    <div className='playerContainer'>
      { videoStream ?
        <video className='webcamContainer' style={size}
          ref={videoRef}>
        </video> :
        <div className='nofaceContainer' style={size}></div>
       }
      {audioStream ? <AudioVisualizer audioStream={audioStream} size={size}/> : null}
    </div>
  )
}

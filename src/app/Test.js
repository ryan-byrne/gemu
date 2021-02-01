import {useRef, useState, useEffect} from 'react';
import adapter from 'webrtc-adapter';

const GetUserMedia = () => {

  const [mediaStream, setMediaStream] = useState(null);

  useEffect(()=>{
    async function enableStream(){
      const stream = await navigator.mediaDevices.getUserMedia({video:true});
      setMediaStream(stream);
    }
    if (!mediaStream) { enableStream() }
    else { return () => mediaStream.getTracks().forEach(track=>track.stop())}
  }, [mediaStream]);

  return mediaStream;
}

const Test = () => {
  
  const videoRef = useRef();
  const stream = GetUserMedia();

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }

  return (
    <video ref={videoRef} autoPlay muted />
  )

}

export default Test;

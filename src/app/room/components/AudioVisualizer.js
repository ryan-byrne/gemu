import React, {useEffect, useRef} from 'react';

export default function AudioVisualizer({audioStream}){

  // Animation Variable (in case it stops)
  var animate;

  // Create storage & target for audio data
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 4096;
  var bufferLength = analyser.frequencyBinCount;
  var audioData = new Uint8Array(bufferLength);
  if (audioStream) {
    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyser);
  }

  const draw = () => {

    animate = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(audioData);
    const canvas = canvasRef.current;
    if (!canvas) { return }
    const context = canvas.getContext('2d');
    const { height, width } = canvas;
    context.clearRect(0,0,width, height);
    context.fillStyle = '#2F3E46';
    //context.strokeStyle = 'rgb(255, 255, 255)';
    //context.beginPath();
    //context.moveTo(0,height/2)
    var barWidth = width/bufferLength;
    var barHeight;
    for ( var i in audioData) {
      barHeight = audioData[i];
      context.fillRect(i, 0, barWidth, barHeight/2)
    }

  }

  const cleanup = () => {
    cancelAnimationFrame(animate);
    audioContext.close();
  }

  useEffect(() => {
    if (audioStream) { draw() }
    return () => cleanup()
  }, [])

  // Create the Canvas
  const canvasRef = useRef(null);

  return (
    <canvas className='audioVisualizer' ref={canvasRef}></canvas>
  )
}

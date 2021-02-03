import React, {useState, useRef, useEffect} from 'react';

const AudioVisualizer = ({audioStream, size}) => {

  function draw(){

    animate = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(audioData);
    const canvas = canvasRef.current;
    if (!canvas) { return }
    const context = canvas.getContext('2d');
    const { height, width } = canvas;
    context.clearRect(0,0,width, height);
    context.fillStyle = '#2F3E46';
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.beginPath();
    var x = 0;
    for ( var freq in audioData) {
      var level = audioData[freq] / 128.0;
      var y = level * height / 2;
      (freq === 0) ? context.moveTo(x, y) : context.lineTo(x, y);
      x += width / audioData.length;
    }

    context.lineTo(width, height/2);
    context.stroke();

  }

  function cleanup(){
    cancelAnimationFrame(animate);
    audioContext.close();
  }

  useEffect(() => {
    draw();
    return () => cleanup()
  }, [])

  // Create storage & target for audio data
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaStreamSource(audioStream);
  source.connect(analyser);
  var audioData = new Uint8Array(analyser.frequencyBinCount);

  // Animation Variable (in case it stops)
  var animate;

  // Create the Canvas
  const canvasRef = useRef(null);
  const {height, width} = size;
  const offset = (size.height*3/4).toString()+'px';

  return (
    <div className='audioVisualizer' style={{top:offset}}>
      <canvas ref={canvasRef} height={height/2} width={width*0.8}></canvas>
    </div>
  )
}

export default AudioVisualizer;

import React from 'react';
import Webcam from 'react-webcam';
import './style/Player.css';

import mute from './img/mute.png';
import unmute from './img/unmute.png';
import vid from './img/video.png';
import unvid from './img/novideo.png';
import noface from './img/noface.png';

class Player extends React.Component {

  // TODO: Select camera + audio device
  // TODO: Mute using the M key and turn off video with V

  constructor(props){
    super(props);
    this.state = {audio:null, video:null, x:0, y:0}
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({audio: true});
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleVideo() {
    this.setState({video:!this.state.video});
  }

  toggleMicrophone() {
    console.log(this.state.audio);
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {

    const imgSrc = this.state.audio ? mute : unmute;
    const vidSrc = this.state.video ? vid : unvid;

    // TODO: Add facial recognition

    const style = {
      top:'35%',
      left:'35%'
    }

    return (
      <div className="playerContainer" style={style}>
        {this.props.name}
        <div className="controlContainer">
          <div className='controlButton'>
            <img src={imgSrc} onClick={this.toggleMicrophone} height="40"/>
          </div>
          <div className='controlButton'>
            <img src={vidSrc} onClick={this.toggleVideo} width="40"/>
          </div>
        </div>
        <div className='cameraCropper'>
          {this.state.video ? <Webcam width="240px" audio='false'/> : <img width="240px" src={noface}/>}
        </div>
        <div className="audioPlot">
          {this.state.audio ? <AudioVisualiser audio={this.state.audio} /> : ''}
        </div>
      </div>
    )
  }

}

class AudioVisualiser extends React.Component {

  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.canvas = React.createRef();
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentDidUpdate() {
    const { audioData } = this.state;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;
    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return(
      <canvas width='150px' height='100px' ref={this.canvas}/>
    )
  }

}

export default Player;

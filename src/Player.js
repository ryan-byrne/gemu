import React from 'react';
import Webcam from 'react-webcam';
import './style/Player.css';
import AudioVisualiser from './audio/AudioVisualiser';


class Player extends React.Component {

  // TODO: Select camera + audio device

  constructor(){
    super();
  }

  render() {

    // TODO: Add facial recognition

    const style = {
      top:'40%',
      left:'45%',
      overflow:"hidden",
      color:'white'
    }

    return (
      <div className="playerContainer" style={style}>
        {this.props.name}
        <div className="cameraCropper">
          <Webcam className='cameraFrame' height={200}/>
        </div>
        <AudioVisualiser/>
      </div>
    )
  }
}


class Audio extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return(
        <div>AudioBar</div>
    )
  }
}

export default Player;

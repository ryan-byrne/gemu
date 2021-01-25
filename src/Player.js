import React from 'react';
import Webcam from 'react-webcam';
import './style/Player.css';


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
      color:'white',
    }

    return (
      <div className="playerContainer" style={style}>
        {this.props.name}
        <AudioBar/>
        <div className="cameraCropper">
          <Webcam className='cameraFrame' height={200}/>
        </div>
      </div>
    )
  }
}


class AudioBar extends React.Component{

  constructor(props){
    super(props);
  }

  render() {
    return(
        <div>AudioBar</div>
    )
  }
}

export default Player;

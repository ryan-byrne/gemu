import React from 'react';
import Webcam from 'react-webcam';
import './Player.css';


class Player extends React.Component {

  // TODO: Select camera + audio device

  constructor(){
    super();
  }

  render() {

    const style = {
      position:'absolute',
      top:this.props.position.y,
      left:this.props.position.x
    }

    return (
      <div className="playerContainer">
        <Webcam style={style} height={50}/>
      </div>
    )
  }
}

export default Player;

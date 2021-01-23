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
      top:'40%',
      left:'45%',
      overflow:"hidden",
      width:100,
      height:100
    }

    return (
      <div className="playerContainer" style={style}>
        <Webcam height={120} />
      </div>
    )
  }
}

export default Player;

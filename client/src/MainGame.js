import React from 'react';
import Player from './Pieces/Player';
import './MainGame.css';


class MainGame extends React.Component {
  // TODO: Add playground
  constructor(props){
    super(props);
    const {innerWidth: width, innerHeight: height} = window
    this.state = {x:0,y:0,width:width,height:height}
  }

  handleKey(event){



    if (event.key === 'ArrowRight') {
      this.setState({x:this.state.x-5,width:this.state.width+5})
    }
    else if (event.key === 'ArrowLeft') {
      this.setState({x:this.state.x+5,width:this.state.width-5})
    }
    else if (event.key === 'ArrowUp') {
      this.setState({y:this.state.y+5,height:this.state.height-5});
    }
    else if (event.key === 'ArrowDown') {
      this.setState({y:this.state.y-5,height:this.state.height+5})
    }

  }

  handleResize(){
    const {innerWidth: width, innerHeight: height} = window
    this.setState({width:width,height:height});
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleResize.bind(this))
    document.addEventListener("keydown", this.handleKey.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKey.bind(this), false);
    window.removeEventListener("resize", this.handleResize.bind(this))
  }

  render(){

    // TODO: Move x, y coordinates to playground

    const roomCoor = {
      left: this.state.x,
      top: this.state.y,
      width: this.state.width,
      height: this.state.height
    }

    return (
      <div className="gameContainer">
        <div className="roomContainer" style={roomCoor}></div>
        <Player/>
      </div>
    )
  }
}

export default MainGame;

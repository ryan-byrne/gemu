import React from 'react';
import Player from './Player';
import './style/Room.css';


class MainGame extends React.Component {
  // TODO: Add playground
  // Picture 3200 X 2000

  /*
            3200
   _______________________
  |        width          |
  |      ________         |
  |     |    *   | height |  2000
  |     |________|        |
  |                       |
  |_______________________|

  width = 500
  height = 400
  x = 1600
  y = 1000

  left = x - width/2 - 3200
  top = y - height/2 - 2000




  * = x,y

  Player is always center of screen

  */



  constructor(props){
    super(props);
    const {innerWidth: width, innerHeight: height} = window
    this.state = {
      x:0,
      y:0,
      width:width,
      height:height,
      backgroundWidth:3200,
      backgroundHeight:2000,
      moveStep:0,
      pressedKeys:[]
    }
  }


  handleKeyChange(){

    // TODO: Smoother movement during key transitions

    var step = this.state.pressedKeys.includes(' ') ? 20 : 10 ;

    var commands = this.state.pressedKeys.map( (key) => {

      if (key === 'ArrowRight'){
        this.setState({
          x:Math.min(this.state.x+step, this.state.backgroundWidth+this.state.width)
        });
      }
      else if (key === 'ArrowLeft'){
        this.setState({
          x:Math.max(this.state.x-step, 0)
        });
      }
      else if (key === 'ArrowUp'){
        this.setState({
          y:Math.min(this.state.y+step, this.state.backgroundHeight+this.state.height)
        });
      }
      else if (key === 'ArrowDown'){
        this.setState({
          y:Math.max(this.state.y-step, 0)
        });
      }
    });

  }

  handleKeyPress(event){

    let currentKeys = this.state.pressedKeys;

    var i = currentKeys.includes(event.key) ? null : currentKeys.push(event.key);

    this.setState({
      pressedKeys:currentKeys
    });

    this.handleKeyChange();

  }

  handleKeyRelease(event){

    let currentKeys = this.state.pressedKeys;

    const idx = currentKeys.indexOf(event.key);

    currentKeys.splice(idx, idx+1);

    this.setState({
      pressedKeys:currentKeys
    });

    this.handleKeyChange();

  }

  handleResize(){

    const {innerWidth: width, innerHeight: height} = window

    this.setState({width:width,height:height,});
  }

  componentDidMount(){
    window.addEventListener("resize", this.handleResize.bind(this))
    document.addEventListener("keydown", this.handleKeyPress.bind(this), false);
    document.addEventListener("keyup", this.handleKeyRelease.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress.bind(this), false);
    document.addEventListener("keyup", this.handleKeyRelease.bind(this), false);
    window.removeEventListener("resize", this.handleResize.bind(this))
  }

  render(){

    // TODO: Replace static background with actual game room


    const roomPos = {
      backgroundPositionX: -this.state.x+this.state.width/2,
      backgroundPositionY: -this.state.backgroundHeight+this.state.y+this.state.height/2,
      height: this.state.height,
      width: this.state.width,
    }

    return (
      <div className="gameContainer">
        <div className="roomContainer" style={roomPos}></div>
        <Player name={this.props.name}/>
      </div>
    )
  }
}

export default MainGame;

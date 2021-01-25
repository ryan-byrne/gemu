import React from 'react';
import Player from './Pieces/Player';
import './MainGame.css';


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
      y:-800,
      width:width,
      height:height,
      backgroundWidth:3200,
      backgroundHeight:2000,
      pressedKeys:[]
    }
  }


  handleKeyChange(){

    var step = this.state.pressedKeys.includes(' ') ? 20 : 10 ;

    var commands = this.state.pressedKeys.map( (key) => {

      if (key === 'ArrowRight'){
        this.setState({
          x:Math.max(this.state.x-step, this.state.width-this.state.backgroundWidth)
        });
      }
      else if (key === 'ArrowLeft'){
        this.setState({x:Math.min(this.state.x+step,0)});
      }
      else if (key === 'ArrowUp'){
        this.setState({y:Math.min(this.state.y+step,0)});
      }
      else if (key === 'ArrowDown'){
        this.setState({
          y:Math.max(this.state.y-step, this.state.height-this.state.backgroundHeight)
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

    currentKeys.splice(currentKeys.indexOf(event.key), 1);

    this.setState({
      pressedKeys:currentKeys
    });

    this.handleKeyChange();

  }

  handleResize(){
    const {innerWidth: width, innerHeight: height} = window
    this.setState({width:width,height:height});
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

    // TODO: Position on screen general screen doesn't change w/ resize

    const roomPos = {
      backgroundPositionX:this.state.x,
      backgroundPositionY:this.state.y,
      height: this.state.height,
      width:this.state.width,
    }

    console.log(this.state);


    return (
      <div className="gameContainer">
        <div className="roomContainer" style={roomPos}></div>
        <Player name={this.props.name}/>
      </div>
    )
  }
}

export default MainGame;

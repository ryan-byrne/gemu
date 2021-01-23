import React from 'react';
import Player from './Pieces/Player';
import './MainGame.css';


class MainGame extends React.Component {
  // TODO: Add playground
  constructor(props){
    super(props);
    const {innerWidth: width, innerHeight: height} = window
    this.state = {x:0,y:0,width:width,height:height,pressedKeys:[]}
  }


  handleKeyChange(){

    var step = this.state.pressedKeys.includes(' ') ? 20 : 10 ;

    this.state.pressedKeys.map( (key) => {

      if (key === 'ArrowRight'){
        this.setState({x:this.state.x-step,width:this.state.width+step});
      }
      else if (key === 'ArrowLeft'){
        this.setState({x:this.state.x+step,width:this.state.width-step});
      }
      else if (key === 'ArrowUp'){
        this.setState({y:this.state.y+step,width:this.state.height-step});
      }
      else if (key === 'ArrowDown'){
        this.setState({y:this.state.y-step,width:this.state.height+step});
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

    // TODO: Move x, y coordinates to playground
    // TODO: Replace static background with actual game room
    const roomCoor = {
      left: this.state.x,
      top: this.state.y,
      width: this.state.width,
      height: this.state.height
    }

    return (
      <div className="gameContainer">
        <div className="roomContainer" style={roomCoor}></div>
        <Player name={this.props.name}/>
      </div>
    )
  }
}

export default MainGame;

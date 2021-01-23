import React from 'react';
import Player from './Pieces/Player';
import './MainGame.css';


class MainGame extends React.Component {
  // TODO: Add playground
  constructor(props){
    super();
    this.state = {
      x:200,
      y:200
    }
  }

  handleKey(event){
    let key = event.key;
    if (event.key === 'ArrowRight') {
      this.setState({x:this.state.x+5})
    }
    else if (event.key === 'ArrowLeft' && this.state.x != 0) {
      this.setState({x:this.state.x-5})
    }
    else if (event.key === 'ArrowUp' && this.state.y != 0) {
      this.setState({y:this.state.y-5});
    }
    else if (event.key === 'ArrowDown') {
      this.setState({y:this.state.y+5})
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKey.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKey.bind(this), false);
  }

  render(){

    // TODO: Move x, y coordinates to playground

    const pos = {
      x: this.state.x,
      y: this.state.y
    }

    return (
      <Player position={pos}/>
    )
  }
}

export default MainGame;

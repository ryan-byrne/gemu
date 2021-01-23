import React from 'react';
import MainMenu from './MainMenu';
import Game from './Game';


class Gemu extends React.Component {

  constructor(){
    super();
    this.state = {
      ready:false,
      name:null,
      email:null,
      code:null
    }
  }

  setReady(type, settings){
    this.setState({
      ready:true,
      name:settings.name,
      email:settings.email,
      id:settings.code
    })
  }

  render(){

    console.log(this.state);

    if (this.state.ready){
      return <Game id={this.state.id} name={this.state.name} email={this.state.email}/>
    }
    else {
      return <MainMenu setReady={this.setReady.bind(this)}/>
    }
  }
}

export default Gemu;

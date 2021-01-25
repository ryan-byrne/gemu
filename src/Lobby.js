import React from 'react';
import MainMenu from './menu/Main';
import Room from './Room';

class Lobby extends React.Component {

  constructor(){
    super();
    // TODO: set default ready to false after testing
    this.state = {ready:true,name:"ryan",email:null,code:null}
  }

  setReady(type, settings){
    this.setState({ready:true,name:settings.name,email:settings.email,id:settings.code})
  }

  render(){

    if (this.state.ready){
      return <Room className='mainScreen' id={this.state.id} name={this.state.name} email={this.state.email}/>
    }
    else {
      return <MainMenu setReady={this.setReady.bind(this)}/>
    }
  }
}

export default Lobby;

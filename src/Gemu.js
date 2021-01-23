import React from 'react';
import MainMenu from './MainMenu';
import MainGame from './MainGame';


class Gemu extends React.Component {

  constructor(){
    super();
    // TODO: set default ready to false after testing
    this.state = {
      ready:true,
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

    if (this.state.ready){
      return <MainGame className='mainScreen' id={this.state.id} name={this.state.name} email={this.state.email}/>
    }
    else {
      return <MainMenu setReady={this.setReady.bind(this)}/>
    }
  }
}

export default Gemu;

import React from 'react';
import MainMenu from './MainMenu/MainMenu';


class Gemu extends React.Component {

  constructor(){
    super();
    this.state = {index:0}
  }

  render(){
    return <MainMenu/>;
  }
}

export default Gemu;

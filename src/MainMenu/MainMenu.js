import React from 'react';
import './MainMenu.css';

class MainMenu extends React.Component {

  constructor(){
    super();
    this.state = {index:0}
  }

  changeMenu(index) {
    if (index == this.state.index) {
      this.setState({index:0})
    }
    else {
      this.setState({index:index})
    }
  }

  render() {

    const subMenus = [<div></div>, <JoinMenu/>, <StartMenu/>]

    return (
      <div className='menuContainer'>
        <div className='mainMenu'>
          <MenuItem name="Join a Gemu" onClick={(e) => this.changeMenu(1)}/>
          <MenuItem name="Start a Gemu" onClick={(e) => this.changeMenu(2)}/>
        </div>
        <div className='subMenu'>{subMenus[this.state.index]}</div>
      </div>
    )
  }
}

class MenuItem extends React.Component {

  constructor() {
    super();
    this.state = {
      hover: false,
      selected: false
    }
  }

  changeHover(){
    if (!this.state.selected) {
      this.setState({hover:!this.state.hover})
    }
  }


  render() {

    let itemClass = this.state.hover ? 'hoveredMenuItem' : 'normalMenuItem';
    let subMenu =  this.state.selected ? <div>Selected</div> : <div></div>

    return (
      <div
        className = {itemClass}
        onMouseEnter = {this.changeHover.bind(this)}
        onMouseLeave = {this.changeHover.bind(this)}
        onClick = {this.props.onClick}
        style = {{padding:'20px', cursor:'pointer', borderRadius:'10px'}}
      >
        {this.props.name}
      </div>
    )
  }
}

class JoinMenu extends React.Component {

  constructor() {
    super()
    this.state = {
      roomCode:'ROOM CODE',
      textColor:'#d1d1d1',
      letterSpacing:'1px'
    }
  }

  inputSelect() {
    this.setState({roomCode:""})
  }

  roomInput(event) {

    let type = event.nativeEvent.inputType;

    if (type === 'insertText'){
      let newText = this.state.roomCode + event.nativeEvent.data;
      this.setState({roomCode:newText})
      console.log(newText);
    }
    else if (type === "") {}

    console.log(type);

  }

  roomOut() {
    this.setState({
      roomCode:'ROOM CODE',
      textColor:'#d1d1d1',
      letterSpacing:'1px'
    })
  }

  render() {

    return (
      <div>
        <form>
          <label>
            <input
              onBlur={this.roomOut.bind(this)} value={this.state.roomCode}
              onChange={this.roomInput.bind(this)} autoComplete='off'
              onClick={this.inputSelect.bind(this)} className='roomCode'
              type="text" maxLength='6' style={
                {
                  color:this.state.textColor
                }
              }
            />
          </label>
        </form>
      </div>
    )
  }

}

class StartMenu extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>StartMenu</div>
    )
  }
}


export default MainMenu;

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
  }

  render() {

    return (
      <div className='joinForm'>
        <FormItem name="name" maxLength='10' letterSpacing='5px'/>
        <FormItem name="email" maxLength='20' letterSpacing='2px'/>
        <FormItem name="code" maxLength='6' letterSpacing='1px'/>
      </div>
    )
  }

}

class FormItem extends React.Component {

  constructor(props) {
    super()
    this.state = {
      formText:props.name.toUpperCase(),
      color:'lightgray',
      completed:false,
      letterSpacing:'2px',
      error:false
    }
  }

  textInput(event) {

    let type = event.nativeEvent.inputType;
    let currentText = this.state.formText;
    let newText;

    if (type === 'insertText'){
      newText = currentText + event.nativeEvent.data;
    }
    else if (type === "deleteContentBackward") {
      newText = ""
    }
    else {
      newText = currentText;
    }

    this.setState({
      formText:newText,
      color:'blue',
      border:'solid 2px #FFDC00'
    })

  }

  inputSelect() {
    let text = this.state.formText === this.props.name.toUpperCase() ? "" : this.state.formText;
    this.setState({formText:text})
  }

  leaveText() {

    if (this.state.formText.length > 0) {
      return
    }
    else {
      this.setState({
        formText:this.props.name.toUpperCase(),
        color:'#d1d1d1',
        letterSpacing:'1px'
      })
    }

    let text = this.state.formText === "" ? this.props.name : this.state.formText
  }

  render () {

    let color = this.state.completed ?  'green' : 'lightgray'

    return (
      <div>
        <input
        onBlur={this.leaveText.bind(this)} value={this.state.formText}
        onFocus={this.inputSelect.bind(this)}
        onChange={this.textInput.bind(this)} autoComplete='off' className='formInput'
        type="text" maxLength={this.props.maxLength} style={
          {
            color:this.state.color,
            fontSize:this.state.fontSize,
            letterSpacing:this.state.letterSpacing,
            borderColor:color
          }
        }
        />
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

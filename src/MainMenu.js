import React from 'react';
import './MainMenu.css';

class MainMenu extends React.Component {

  constructor(){
    super();
    this.state = {highlighted:0}
  }

  changeMenu(index) {
    if (index === this.state.highlighted) {
      this.setState({highlighted:0})
    }
    else {
      this.setState({highlighted:index})
    }
  }

  render() {

    const subMenus = [
      <div></div>,
      <JoinMenu setReady={this.props.setReady}/>,
      <StartMenu setReady={this.props.setReady}/>]

    return (
      <div className='menuContainer'>
        <div className='mainMenu'>
          <MenuItem setReady={this.props.setReady.bind(this)} name="Join" onClick={(e) => this.changeMenu(1)}/>
          <MenuItem setReady={this.props.setReady.bind(this)} name="Start" onClick={(e) => this.changeMenu(2)}/>
        </div>
        <div className='subMenu'>{subMenus[this.state.highlighted]}</div>
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

    return (
      <div
        className = {itemClass}
        onMouseEnter = {this.changeHover.bind(this)}
        onMouseLeave = {this.changeHover.bind(this)}
        onClick = {this.props.onClick}
        style = {{padding:'20px', cursor:'pointer', borderRadius:'10px'}}
      >
        {this.props.name} a Gemu
      </div>
    )
  }
}

class JoinMenu extends React.Component {

  constructor() {
    super()
    this.state = {
      name:"",
      email: "",
      code:"",
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  validateValue(name, value) {
    if ( name === 'name') {
      this.setState({name:value});
      return true;
    }
    else if ( name === 'code' && value.length === 6){
      // TODO: Correct this to actually look for game
      this.setState({code:value});
      return true;
    }
    else {
      if (this.validateEmail(value)){
        this.setState({email:value});
        return true;
      }
      else {
        return false;
      }
    }
  }

  validateEntries(){
    for (var key in this.state) {
      if (this.state[key] === ""){
        return false;
      }
    }
    return true;
  }

  render() {

    if (this.validateEntries()){
      this.props.setReady('join', this.state);
    }

    const formProps = [
      {name:'name',maxLength:'10',letterSpacing:'3px'},
      {name:'email',maxLength:'30',letterSpacing:'1px'},
      {name:'code',maxLength:'6',letterSpacing:'10px'}
    ]

    const forms = formProps.map( (row) => {
      return (
        <FormItem key={row.name} name={row.name} maxLength={row.maxLength}
          validateValue={this.validateValue.bind(this)}letterSpacing={row.letterSpacing}/>
      )
    });

    return (
      <div className='joinForm'>
        {forms}
      </div>
    )
  }

}

class FormItem extends React.Component {

  constructor(props) {
    super()
    this.state = {
      formText: props.name.toUpperCase(),
      color:'lightgray',
      completed:false,
      letterSpacing:'2px',
      error:false
    }
  }

  textInput(event) {

    let type = event.nativeEvent.inputType;
    let c = event.nativeEvent.data
    let newText;

    if (type === 'insertText'){
      newText = this.state.formText + c;
    }
    else if (type === "deleteContentBackward") {
      newText = "";
    }
    else {
      newText = this.state.formText;
    }

    let bc = this.props.validateValue(this.props.name, newText) ? 'green' : 'lightgray'

    this.setState({
      formText: newText,
      color:'blue',
      letterSpacing:this.props.letterSpacing,
      borderColor:bc
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
        color:'lightgray',
        letterSpacing:'1px'
      })
    }

  }

  render () {

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
            borderColor:this.state.borderColor
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
    this.state = {
      penis:""
    }
  }

  render() {
    return (
      <div>StartMenu</div>
    )
  }
}

export default MainMenu;

import React, { Component } from 'react';
// import './Search.css';

class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  onClick = (e) => {
    this.props.onClick(e.target.value);
    console.log("e.target.value")
  } 
	render() {
    console.log(this.state.inputValue)
		return (
			<div className="form">
				<form>
					<input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="text" name="city" placeholder="Berlin"/>
					<button onClick={this.onClick} type="button">Go</button>
				</form>
			</div>	
		);
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
}



export default Form;
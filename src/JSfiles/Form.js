import React, { Component } from 'react';
import '../CSSfiles/Form.css';

class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.props.onCityChange(event.target.value);
  }
  handleSubmit(event) {
    this.props.onSubmit(event)
  }
	render() {
		return (
			<div className="form" onSubmit={this.handleSubmit}>
				<form id="form">
					<input id="cityInput" onChange={this.handleChange} type="text" name="city" placeholder=""/>
					<button id="button" type="submit" value=""><i className="fas fa-search"></i></button>
				</form>
			</div>	
		);
  }
}




export default Form;
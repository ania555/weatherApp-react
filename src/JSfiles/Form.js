import React, { Component } from 'react';
 import '../CSSfiles/Form.css';

class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
    };
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
				<form>
					<input onChange={this.handleChange} type="text" name="city" placeholder="Berlin"/>
					<input type="submit" value="Submit" />
				</form>
			</div>	
		);
  }

}




export default Form;
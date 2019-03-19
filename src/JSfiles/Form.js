import React, { Component } from 'react';
// import './Search.css';

class Form extends Component {
	render() {
		return (
			<div className="form">
				<form>
					<input type="text" name="city" placeholder="Berlin"/>
					<button>Go</button>
				</form>
			</div>	
		);
	}
}



export default Form;
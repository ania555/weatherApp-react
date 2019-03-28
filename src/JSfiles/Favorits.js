import React, { Component } from 'react';
import Menu from '../JSfiles/Menu';
import '../CSSfiles/Favorits.css';





class Favorits extends Component {
	render() {
		return (
			<div className="favorits">
			<div className="positionMenu">
        <Menu />
      </div>
			<h2>Favorite locations</h2>
			<br></br>
				
			</div>	
		);
	}
}



export default Favorits;
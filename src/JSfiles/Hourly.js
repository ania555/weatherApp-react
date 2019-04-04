import React, { Component } from 'react';
import '../CSSfiles/Landing.css';



class Hourly extends Component {
	render() {
    const smallList = this.props.hours;
		return (
			<div className="hourly">
				<div id="every3hours">
					<div>
						<p className="hours3Hour">Now</p>
						<img className="hours3Icon" src={this.props.currentIcon } alt="weather icon"/>
						<p className="hours3Temp">{this.props.currentTemp}°</p>
					</div>
					{smallList.map((list, index) => (
						<div key={index} className="hourlyItem">
							<p className="hours3Hour">{list.dt_txt.slice(10, 16)}</p>
							<img className="hours3Icon" src={"http://openweathermap.org/img/w/" + list.weather[0].icon + ".png" } alt="weather icon"/>
							<p className="hours3Temp">{list.main.temp.toFixed(0)}°</p>
						</div>
					))}
				</div>
			</div>	
		);
	}
}



export default Hourly;
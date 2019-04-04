import React, { Component } from 'react';
import '../CSSfiles/Landing.css';


class Daily extends Component {
	render() {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const ms = new Date().getTime() + 86400000;
		return (
			<div className="daily">
				<p className="dailyDay">{weekDays[new Date(ms + this.props.dayIndex * 86400000).getDay()]}</p>
        <img className="dailyIcon" src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"}  alt="weather icon"/> 
        <p className="dailyTempMax">{this.props.tempMax}°</p>
        <p className="dailyTempMin">{this.props.tempMin}°</p>
			</div>	
		);
	}
}



export default Daily;
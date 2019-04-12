import React, { Component } from 'react';
import ls from 'local-storage';
import sunny from '../Images/super-clear-sky.jpg';
import fewClouds from '../Images/fav-clouds.jpg';
import scatteredClouds from '../Images/scatter3.jpg';
import brokenClouds from '../Images/gloomy2.jpg';
import shower from '../Images/rain3.jpg';
import dayRain from '../Images/rain5.jpg';
import snowDay from '../Images/snowGrey.jpg';
import dayThunder from '../Images/thunder-day.jpg';
import dayMist from '../Images/mist3.jpg';

import nightClear from '../Images/stars-sky.jpg';
import nightClearClouds from '../Images/night-clear-clouds.jpg';
import nightClouds from '../Images/cloudy-night1.jpg';
import nightRain from '../Images/rain-night1.jpg';
import nightSnow from '../Images/snow-night-vertical.jpg';
import nightThunder from '../Images/thunder-night3.jpg';
import nightMist from '../Images/mist-night1.jpg';
import '../CSSfiles/Location.css';



const allIcons = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"];
const allBackgrounds = [sunny, nightClear, fewClouds, nightClearClouds, scatteredClouds, nightClouds, brokenClouds, nightClouds,
 shower, nightRain, dayRain, nightRain, dayThunder, nightThunder, snowDay, nightSnow, dayMist, nightMist];



class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: null,
      nowWeather: "",
      nowTemp: null,
      todayTempMax: null,
      todayTempMin: null,
      iconCode: null,
      nowWind: null 
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.onClick(event, this.state.currentCity)
  }
  fetchWeatherSub(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f01129677616a96d5459d7c474e647c`)
    .then((res) => { if (res.ok) {
      return res.json();
      } 
      else if (!res.ok) { 
        ls.set('unvalid', this.props.cityName.toString());
        alert(this.props.cityName +' is not a valid city name')
        throw new Error('Network response was not ok.')}
      })
    .then((json) => {this.setState({ 
      data: json, 
      currentCity: json.name, 
      nowTemp: json.main.temp.toFixed(0),
      todayTempMax: json.main.temp_max.toFixed(0),
      todayTempMin: json.main.temp_min.toFixed(0),  
      nowWeather: json.weather[0].description.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' '),
      nowIcon: "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
      iconCode: json.weather[0].icon,
      nowWind: json.wind.speed
      })
    })
    .catch(error => console.log(error));  
  }
  componentDidMount() {
    this.fetchWeatherSub(this.props.cityName);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.cityName !== this.props.cityName) {
      this.fetchWeatherSub(this.props.cityName);
    } 
  }
	render() {
    const unvalidLocation = ls.get('unvalid');
    if ((unvalidLocation && this.state.currentCity !== null && this.props.cityName.toLowerCase() !== unvalidLocation.toLowerCase()) || (!unvalidLocation && this.state.currentCity !== null)) {
		return (
			<div className="location" onClick={this.handleClick} style={{backgroundImage: "url(" + allBackgrounds[allIcons.indexOf(this.state.iconCode)]  + ")"}}>    
		    <p id="cityN">{this.props.cityName}</p>
        <p id="tNow">{this.state.nowTemp}°</p>
        <p id="wethDesc">{this.state.nowWeather}</p>
        <p className="detTemp">{this.state.todayTempMax}°</p>
        <p className="detTemp">{this.state.todayTempMin}°</p>
        <p id="wind"><i className="fas fa-wind"></i> {this.state.nowWind} m/sec</p>        
			</div>	
    )}
    else return false;
	}
}


export default Location;
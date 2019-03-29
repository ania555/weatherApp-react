import React, { Component } from 'react';
import Menu from '../JSfiles/Menu';
import Form from '../JSfiles/Form.js';
import Daily from '../JSfiles/Daily.js';
import Hourly from '../JSfiles/Hourly.js';
import sunny from '../Images/super-clear-sky.jpg';
import fewClouds from '../Images/clearCouds2.jpg';
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
import '../CSSfiles/Landing.css';



const allIcons = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"];
const allBackgrounds = [sunny, nightClear, fewClouds, nightClearClouds, scatteredClouds, nightClouds, brokenClouds, nightClouds,
 shower, nightRain, dayRain, nightRain, dayThunder, nightThunder, snowDay, nightSnow, dayMist, nightMist];


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      inputValue: "",
      data: {},
      nowTemp: null,
      todayTempMax: null,
      todayTempMin: null, 
      nowWeather: null,
      nowIcon: null,
      iconCode: "",
      lists: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }
  handleCityChange(inputValue) {
    this.setState({inputValue})
  }
  handleSubmit(event) {
    if (this.state.inputValue == "") { alert('Not valid city'); return false}
    alert('A name was submitted: ' + this.state.inputValue);
    this.fetchWeatherSub(this.state.inputValue);
    event.preventDefault();
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeatherGeo(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );  
  }
  fetchWeatherGeo(lat, lon) {
    Promise.all([ 
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0f01129677616a96d5459d7c474e647c`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=0f01129677616a96d5459d7c474e647c`)
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([json1, json2]) =>  {this.setState({ 
      data: json1,  
      nowTemp: json1.main.temp.toFixed(0),
      todayTempMax: json1.main.temp_max.toFixed(0),
      todayTempMin: json1.main.temp_min.toFixed(0),  
      nowWeather: json1.weather[0].description.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' '),
      nowIcon: "http://openweathermap.org/img/w/" + json1.weather[0].icon + ".png",
      iconCode: json1.weather[0].icon,
      lists: json2.list
    })
      console.log(this.state.data)});
  }
  fetchWeatherSub(city) {
    Promise.all([ 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f01129677616a96d5459d7c474e647c`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0f01129677616a96d5459d7c474e647c`)
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([json1, json2]) =>  {this.setState({ 
      data: json1,  
      nowTemp: json1.main.temp.toFixed(0),
      todayTempMax: json1.main.temp_max.toFixed(0),
      todayTempMin: json1.main.temp_min.toFixed(0),  
      nowWeather: json1.weather[0].description.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' '),
      nowIcon: "http://openweathermap.org/img/w/" + json1.weather[0].icon + ".png",
      iconCode: json1.weather[0].icon,
      lists: json2.list
    })
    
      console.log(this.state.data)});  
  }
  render() {
    const smallList = this.state.lists.slice(0, 9);
    const hour3list = this.state.lists.filter(list => list.dt_txt.slice(11, 16) === "03:00");
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <div className="landingPage" style={{backgroundImage: "url(" + allBackgrounds[allIcons.indexOf(this.state.iconCode)]  + ")"}}>
        <div className="positionMenu">
          <Menu />
        </div>
        <Form  onCityChange={this.handleCityChange} onSubmit={this.handleSubmit} /> 
        <div>
          <p id="cityName">{this.state.data.name}</p>
          <p id="weatherDescr">{this.state.nowWeather}</p>
          <p id="tempNow">{this.state.nowTemp}</p>
        </div>
        <div id="currentDay">      
          <p className="dailyDay1">{weekDays[new Date().getDay()]}</p>
          <p className="dailyTempMax">{this.state.todayTempMax}°</p>
          <p className="dailyTempMin">{this.state.todayTempMin}°</p>
        </div>
        <hr id="hrTop"></hr>
        <Hourly hours={smallList} currentIcon={this.state.nowIcon} currentTemp={this.state.nowTemp} />
        <hr id="hrBottom"></hr>
        <div id="days">
          {this.state.lists.filter(list => list.dt_txt.slice(11, 16) === "15:00")
          .map((list, index) => ( 
            <Daily key={index} dayIndex= {index} icon={list.weather[0].icon} 
              tempMax={list.main.temp_max.toFixed(0)} tempMin={hour3list[index].main.temp_min.toFixed(0)}/>   
          ))}
        </div>
      </div>
    );
  }
}

export default Landing; 
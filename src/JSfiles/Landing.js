import React, { Component } from 'react';
import Menu from '../JSfiles/Menu';
import Form from '../JSfiles/Form.js'
import Daily from '../JSfiles/Daily.js'
//import rain from '../Images/rain-transp.png'
import '../CSSfiles/Landing.css';


const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDay = weekDays[new Date().getDay()];


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      inputValue: "",
      data: {},
      nowTemp: null,
      nowWeather: {},
      nowIcon: null,
      lists: []
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
  }
  handleCityChange(inputValue) {
    this.setState({inputValue})
  }
  /* handleChange(event) {
    this.setState({inputValue: event.target.value});
  } */
  handleSubmit(event) {
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
      nowWeather: json1.weather[0],
      nowIcon: "http://openweathermap.org/img/w/" + json1.weather[0].icon + ".png",
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
      nowWeather: json1.weather[0],
      nowIcon: "http://openweathermap.org/img/w/" + json1.weather[0].icon + ".png",
      lists: json2.list
    })
      console.log(this.state.data)});  
  }
  render() {
    const smallList = this.state.lists.slice(0, 9);
    const hour3list = this.state.lists.filter(list => list.dt_txt.slice(11, 16) === "03:00");
    return (
      <div className="landingPage">
        <Menu/>
        <Form  onCityChange={this.handleCityChange} onSubmit={this.handleSubmit} /> 
        {/* <div className="form">
          <form onSubmit={this.handleSubmit}> 
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} name="city" placeholder="City"/>
            <input type="submit" value="Submit" />
          </form>
        </div> */}
        <div>{this.state.data.name}</div>
        <div>{this.state.nowWeather.description}</div>
        <div>{this.state.nowTemp}°</div>
        <img id="mainIcon" src={this.state.nowIcon} /> 
        <div>{weekDay}</div>
        <hr></hr>
        <div id="every3hours">
          <div>
            <p>Now</p>
            <img src={this.state.nowIcon} />
            <p>{this.state.nowTemp}°</p>
          </div>
          {smallList.map((list, index) => (
            <div key={index}>
              <p>{list.dt_txt.slice(10, 16)}</p>
              <img src={"http://openweathermap.org/img/w/" + list.weather[0].icon + ".png" } />
              <p>{list.main.temp.toFixed(0)}°</p>
            </div>
          ))}
        </div>
        <hr></hr>
        <div>
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
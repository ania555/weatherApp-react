import React, { Component } from 'react';
import Menu from '../JSfiles/Menu';
import Form from '../JSfiles/Form.js'
import rain from '../Images/rain-transp.png'
//import Header from '../JScript/Header';
//import Carousell from '../JScript/Carousell';
import '../CSSfiles/Landing.css';


//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const myDate = new Date;
const day = myDate.getDate();
const myDay = myDate.getDay();
const weekDay = weekDays[myDay];


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      nowTemp: null,
      nowWeather: {},
      nowIcon: null,
      lists: []
    };
  }
  componentDidMount() {
    Promise.all([
      fetch("https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=0f01129677616a96d5459d7c474e647c"),
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=Berlin&units=metric&appid=0f01129677616a96d5459d7c474e647c")
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
    console.log(this.state.data)
    const smallList = this.state.lists.slice(0, 9);
    return (
      <div className="landingPage">
      <Menu/>
      <Form/>
      <div>{day} {weekDay} </div>
      <div>{this.state.data.name}</div>
      <div>{this.state.nowWeather.description}</div>
      <div>{this.state.nowTemp}°</div>
      <img id="mainIcon" src={this.state.nowIcon} /> 
      
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
            <img src={"http://openweathermap.org/img/w/" + list.weather[0].icon + ".png"} />
            <p>{list.main.temp.toFixed(0)}°</p>
          </div>
        ))}
      </div>
      <hr></hr> 
        
      </div>
    );
  }
}

export default Landing; 
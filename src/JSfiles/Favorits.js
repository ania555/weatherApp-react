import React, { Component } from 'react';
import ls from 'local-storage';
import Menu from '../JSfiles/Menu';
import Form from '../JSfiles/Form.js';
import Location from '../JSfiles/Location.js'; 
import '../CSSfiles/Favorits.css';





class Favorits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      cities: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this); 
  }
  handleCityChange(inputValue) {
    this.setState({inputValue}); 
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.inputValue);
    this.state.cities.push(this.state.inputValue) 
    ls.set('sessCities', JSON.stringify(this.state.cities))
    console.log(this.state.cities)
    this.showArr();
    this.fetchWeatherSub(this.state.cities);
    event.preventDefault();
  }
  showArr() {
    let x = JSON.parse(ls.get('sessCities'))
    console.log(x)
  }
  componentDidMount() {
    //ls.clear()
    const defaultCities = [];
    const savedLocations = JSON.parse(ls.get('sessCities'));
   
    if (savedLocations == null) {
      this.setState({
        cities: defaultCities
      }) 
    }
    else {
      this.setState({
        cities: savedLocations
      }) 
    }
    console.log(savedLocations) 
  }
	render() {
		return (
			<div className="favorits">
        <div className="positionMenu">
          <Menu />
        </div>
        <h2>Favorite locations</h2>
        <Form onCityChange={this.handleCityChange} onSubmit={this.handleSubmit}/>
        <br></br>
        <div id="locsContainer">
        {this.state.cities.map((city, index) => (
          <Location key={index} cityName={city.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}/>
        ))} 
        </div>
			</div>	
		);
	}
}



export default Favorits;
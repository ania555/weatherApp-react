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
      currCity: "",
      cities: [],
      tests: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleClick = this.handleClick.bind(this);  
  }
  handleCityChange(inputValue) {
    this.setState({inputValue}); 
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.inputValue);
    this.state.cities.push(this.state.inputValue);
    this.state.tests.push(this.state.inputValue); 
    ls.set('sessCities', JSON.stringify(this.state.cities));
    ls.set('testing', JSON.stringify(this.state.tests))
    console.log(this.state.cities)
    this.showArr();
    this.fetchWeatherSub(this.state.cities);
    event.preventDefault();
  }
  handleClick(event, currCity) {
    this.setState({
      currCity: currCity
    }, 
    () => {
      this.removeLocation();
    }); 
    event.preventDefault();
  }
  removeLocation() {
    alert('Remove ' + this.state.currCity + " ?");
      console.log(this.state.currCity);
    const remCity = this.state.currCity.toLowerCase()
    const check = JSON.parse(ls.get('sessCities'));
    const newList = check.filter(ch => ch.toLowerCase() !== remCity)
     console.log(newList);
    this.setState({tests: newList});
    this.setState({cities: newList});
    ls.remove('testing');
    ls.remove('sessCities');
    ls.set('testing', JSON.stringify(newList));
    ls.set('sessCities', JSON.stringify(newList));
  }
  showArr() {
    let x = JSON.parse(ls.get('sessCities'))
    console.log(x)
  }
  componentDidMount() {
    //ls.remove('testing');
    const defaultCities = [];
    const savedLocations = JSON.parse(ls.get('sessCities'));
    const check = JSON.parse(ls.get('testing'));
   
    if (savedLocations == null) {
      this.setState({
        cities: defaultCities,
      }) 
    }
    else {
      this.setState({
        cities: savedLocations,
      }) 
    }

    if (check == null) {
      this.setState({
        tests: defaultCities,
      }) 
    }
    else {
      this.setState({
        tests: check
      }) 
    }
    console.log(savedLocations) 
    console.log(check) 
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
        <div>
        {this.state.tests.map((city, index) => (
          <p key={index}>{city}</p>
        ))} 
        </div>
        <div id="locsContainer">
        {this.state.cities.map((city, index) => (
          <Location key={index} cityName={city.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')} onClick={this.handleClick}/>
        ))} 
        </div>
			</div>	
		);
	}
}



export default Favorits;
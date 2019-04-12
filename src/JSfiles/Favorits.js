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
      cities: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleClick = this.handleClick.bind(this);  
  }
  handleCityChange(inputValue) {  
    this.setState({inputValue});   
  }
  handleSubmit(event) {
    if (this.state.inputValue === "") { alert('Not valid city'); return false};
    this.state.cities.push(this.state.inputValue);
    ls.set('sessCities', JSON.stringify(this.state.cities));
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
    const remCity = this.state.currCity.toLowerCase()
    const check = JSON.parse(ls.get('sessCities'));
    const unvalidLocation = ls.get('unvalid');
    if (!unvalidLocation) {
      const newList = check.filter(ch => ch.toLowerCase() !== remCity)
      this.setState({cities: newList});
      ls.remove('sessCities');
      ls.set('sessCities', JSON.stringify(newList));
    }
    if (unvalidLocation) { 
      const newList = check.filter(ch => ch.toLowerCase() !== remCity).filter(ch => ch.toLowerCase() !== unvalidLocation.toLowerCase());
      this.setState({cities: newList});
      ls.remove('sessCities');
      ls.set('sessCities', JSON.stringify(newList));
    }
  }
  componentDidMount() {
    //ls.clear()
    const defaultC = [];
    
    const savedLocations = JSON.parse(ls.get('sessCities'));
    const unvalidLocation = ls.get('unvalid');
    
    if (!savedLocations) {
      this.setState({
        cities: defaultC,
      }) 
    } 
    if (savedLocations && !unvalidLocation) {
      this.setState({
        cities: savedLocations,
      }) 
    }

    if (savedLocations && unvalidLocation) {
      const updatedLocations = savedLocations.filter(loc => loc.toLowerCase() !== unvalidLocation.toLowerCase());
      ls.remove('sessCities');
      ls.set('sessCities', JSON.stringify(updatedLocations));
      this.setState({
        cities: updatedLocations,
      }) 
    }
  }
	render() {
		return (
			<div className="favorits">
        <div className="positionMenu">
          <Menu />
        </div>
        <h2>Favorite Locations</h2>
        <Form onCityChange={this.handleCityChange} onSubmit={this.handleSubmit}/>
        <div id="locsContainer">
        {this.state.cities.map((city, index) => (
          <Location key={index} cityName={city.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')} onClick={this.handleClick}/>
        ))} 
        </div>
        <br></br>
        <br></br>
			</div>	
		);
	}
}



export default Favorits;
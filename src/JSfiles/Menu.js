import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import CheeseburgerMenu from 'cheeseburger-menu';
import HamburgerMenu from 'react-hamburger-menu';
import '../CSSfiles/Menu.css';



class Menu extends Component {
    constructor(props) {
      super(props)
      this.state = {
        menuOpen: false,
      }
    }
    openMenu() {
      this.setState({ menuOpen: true })
    }
    closeMenu() {
      this.setState({ menuOpen: false })
    }
    render() {
      return <div>
        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}>
            <div className="menu">
              <ul>
                <li id="firstLink"><Link to='/' onClick={this.closeMenu} className="menu-item">Home</Link></li>
                <li id="secondLink"><Link to='/Favorits' onClick={this.closeMenu} className="menu-item">Favorite locations</Link></li>
              </ul>
            </div>
        </CheeseburgerMenu> 
        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.openMenu.bind(this)}
          width={32}
          height={24}
          strokeWidth={3}
          rotate={0}
          color='white'
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
    }
  }



  
export default Menu;
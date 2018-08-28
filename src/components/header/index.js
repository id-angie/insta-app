import React, { Component } from 'react';
import './index.css';
import Search from '../ui/Search.js';
import LoginButton from '../ui/LoginButton.js';
import imgLogo from '../../assets/img-logo.png';
import textLogo from '../../assets/text-logo.png';

class Header extends Component {
  state = {
    scrolled: false
  };

  handleScroll = () => {
    this.setState({
      scrolled: window.pageYOffset >= 100
    });
  };

  render() {
    return (
      <header
        className={`header${this.state.scrolled ?" header_scrolled" : ""}`}
      >
       <div className="container">
          <div className="header__logo">
            <img
              src={imgLogo} className="header__img-logo img-logo" alt="logo"
            />
            <img
              src={textLogo} className="header__text-logo text-logo" alt="instagram"
            />
          </div>
          <Search />
          <LoginButton />
        </div>
      </header>
    );
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
}

export default Header;
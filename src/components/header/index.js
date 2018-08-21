import React, { Component } from 'react';
import textLogo from './text-logo.png';
import imgLogo from './img-logo.png';
import './index.css';
import Search from './Search.js';
import LoginButton from './LoginButton.js';

class Header extends Component {
  render() {
    return (
      <header className="header">
       <div className="container">
          <div className="header-logo">
            <img src={imgLogo} className="img-logo" />
            <img src={textLogo} className="text-logo" />
          </div>

          <Search />

          <LoginButton />

        </div>
      </header>
    );
  }
}

export default Header;
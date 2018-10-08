import React, { Component } from 'react';
import cn from 'classnames';

import Search from '../ui/Search.js';
import LoginButton from '../ui/LoginButton.js';

import './index.css';

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
        className={ cn("header", {
          "header_scrolled": this.state.scrolled
        }) }
      >
        <div className="container">
          <div className="header__logo-block">
            <div className="header__logo" />
          </div>
          <Search />
          <LoginButton logout={this.props.logout} />
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
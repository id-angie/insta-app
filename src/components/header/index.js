import React, { Component } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import Search from '../ui/Search.js';
import LoginButton from '../ui/LoginButton.js';
import { logout } from '../../actions';

import './index.scss';

class Header extends Component {
  state = {
    scrolled: false
  };

  cutHeader = () => {
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
          {this.props.currentUser ?
            <>
              <LoginButton
                logout={this.props.logout}
                user={this.props.currentUser}
              />
            </>
          :
            <div className="login-button">
              <Link to='/login' className='login-button__link'>Войти</Link>
            </div>
          }
        </div>
      </header>
    );
  }

  componentDidMount() {
    document.addEventListener('scroll', this.cutHeader);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.cutHeader);
  }
}

export default connect(
  (state) => ({
    currentUser: state.currentUser.user
  }),
  {
    logout: logout
  }
)(Header);
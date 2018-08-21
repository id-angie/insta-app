import React, { Component } from 'react';
import './LoginButton.css';

class LoginButton extends Component {
  showLoginForm = (e) => {
    e.preventDefault();

    alert('login');
  }

  render() {
    return (
      <a
        href="#login"
        className="login-button"
        onClick={this.showLoginForm}
      >
        Войти
      </a>
    );
  }
}

export default LoginButton;
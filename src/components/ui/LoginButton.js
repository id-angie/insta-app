import React, { Component } from 'react';
import './LoginButton.css';

class LoginButton extends Component {
  showLoginForm = (e) => {
    e.preventDefault();

    alert('login');
  }

  render() {
    return (
      <div className="login-button">
        <a
          href="#login"
          className="login-button__link"
          onClick={this.showLoginForm}
        >
          Войти
        </a>
      </div>
    );
  }
}

export default LoginButton;
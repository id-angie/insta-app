import React, { Component } from 'react';

import './LoginButton.scss';

class LoginButton extends Component {
  render() {
    return (
      <div className="login-button">
        <a
          href="#login"
          className="login-button__link"
          onClick={this.props.logout}
        >
          Выйти
        </a>
      </div>
    );
  }
}

export default LoginButton;
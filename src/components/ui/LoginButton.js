import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClickoutComponent from 'react-onclickout';
import cn from 'classnames';

import './LoginButton.scss';

class LoginButton extends Component {

  state = {
    hidden: true
  };

  toggleDropdown = (hidden) => {
    this.setState({
      hidden: !hidden
    });
  }

  hideDropdown = () => {
    this.setState({
      hidden: true
    });
  }

  render() {
    return (
      <div className="login-button">
        <ClickoutComponent onClickOut={this.hideDropdown}>
          <div
            className="login-button__img"
            onClick={() => this.toggleDropdown(this.state.hidden)}
          />
          <div className={cn(
            "login-button__dropdown",
            {"login-button__dropdown_hidden" : this.state.hidden}
          )}>
            <Link
              to={`/user/${this.props.user.nickname}`}
              className="login-button__user-id"
            >
              {this.props.user.nickname}
            </Link>
            <a
              href='#logout'
              className="login-button__link"
              onClick={this.props.logout}
            >
              Выйти
            </a>
          </div>
        </ClickoutComponent>
      </div>
    );
  }
}

export default LoginButton;
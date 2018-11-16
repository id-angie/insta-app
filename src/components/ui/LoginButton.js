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
              className="login-button__link  login-button__link_user-id"
            >
              {this.props.user.nickname}
            </Link>
            <Link
              to={"/newpost"}
              className="login-button__link login-button__link_new-post"
            >
              Новый пост
            </Link>
            <Link
              to={"/editinfo"}
              className="login-button__link login-button__link_new-post"
            >
              Редактировать
            </Link>
            <a
              href='#logout'
              className="login-button__link login-button__link_logout"
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
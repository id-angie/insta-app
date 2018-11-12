import React, { Component } from 'react';
import cn from 'classnames';

import CustomButton from '../ui/CustomButton.js';

import './index.scss';

class Login extends Component {
  input = null;

  state = {
    login: ''
  }

  handleInput = (e) => {
    let login = e.target.value;

    login = login.replace(/(\W*|\D*)/gi, '');

    this.setState({
      login
    });
  }

  handleClick = (e) => {
    e.preventDefault();

    const {
      login: id
    } = this.state;

    if (!id)
      return;

    this.props.setUser(id);
  }


  render() {
    const {
      login
    } = this.state;

    const isActive = login !== '';

    return (
      <div className="login-container">
        <form className="login">
          <div className="login__logo" />
           <div className="input-box login__input-box">
            <input
              className={ cn(
                "input login__input",
                {"login__input_typing": isActive}
              )}
              value={login}
              onChange={this.handleInput}
            />
            <label
              className={ cn(
                "login__label",
                {"login__label_small": isActive}
              )}>
              Имя пользователя
            </label>
          </div>
          <CustomButton
            className={ cn(
              "login__login-button",
              {"login__login-button_disactive": !isActive})
            }
            isActive={false}
            textDisactive="Перейти"
            onClick={this.handleClick}
          />
        </form>
      </div>
    );
  }
}

export default Login;
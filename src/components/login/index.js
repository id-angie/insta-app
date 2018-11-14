import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import CustomButton from '../ui/CustomButton.js';

import './index.scss';

class Login extends Component {

  state = {
    login: '',
    password: ''
  }

  handleLoginInput = (e) => {
    let login = e.target.value;

    login = login.replace(/(\W*|\D*)/gi, '');

    this.setState({
      login
    });
  }


  handlePasswordInput = (e) => {
    let password = e.target.value;

    this.setState({
      password
    });
  }

  handleEnter = (e) => {
    e.preventDefault();

    const {
      login: nickname,
      password
    } = this.state;

    if (!nickname || !password)
      return;

    this.props.login(nickname, password);
  }

  render() {
    const {
      login,
      password
    } = this.state;

    const isLoginActive = login !== '';
    const isPasswordActive = password !== '';

    return (
      <div className="login-container">
        <form className="login">
          <div className="login__logo" />
           <div className="input-box login__input-box login__input-box_login">
            <input
              className={ cn(
                "input login__input",
                {"login__input_typing": isLoginActive}
              )}
              value={login}
              onChange={this.handleLoginInput}
            />
            <label
              className={ cn(
                "login__label",
                {"login__label_small": isLoginActive}
              )}>
              Имя пользователя
            </label>
          </div>
          <div className="input-box login__input-box login__input-box_password">
            <input
              className={ cn(
                "input login__input",
                {"login__input_typing": isPasswordActive}
              )}
              type="password"
              value={password}
              onChange={this.handlePasswordInput}
            />
            <label
              className={ cn(
                "login__label",
                {"login__label_small": isPasswordActive}
              )}>
              Пароль
            </label>
          </div>
          <CustomButton
            className={ cn(
              "login__login-button",
              {"login__login-button_disactive": !isLoginActive || !isPasswordActive})
            }
            isActive={false}
            textDisactive="Вход"
            onClick={this.handleEnter}
          />
          <Link to="/registration" className="login__registration-link">
            <CustomButton
              className="login__registration-button"
              isActive={true}
              textActive="Регистрация"
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
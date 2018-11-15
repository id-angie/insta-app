import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import CustomButton from '../ui/CustomButton.js';

import './index.scss';

class Registration extends Component {

  state = {
    nickname: '',
    name:'',
    password: '',
    password2: '',
    checkPassword: true
  }

  handleNicknameInput = (e) => {
    let nickname = e.target.value;

    nickname = nickname.replace(/(\W*|\D*)/gi, '');

    this.setState({
      nickname
    });
  }

  handleNameInput = (e) => {
    let name = e.target.value;

    this.setState({
      name
    });
  }

  handlePasswordInput = (e) => {
    let password = e.target.value;

    this.setState({
      password
    });
  }

  handlePassword2Input = (e) => {
    let password2 = e.target.value;

    this.setState({
      password2,
      checkPassword: true
    });
  }

  checkPassword = () => {
    let password = this.state.password;
    let password2 = this.state.password2;

    this.setState({
      checkPassword: password && password2 && password === password2
    });
  }

  handleClick = (e, nickname, name, password) => {
    e.preventDefault();
    if (!this.state.checkPassword)
      return;

    if (!nickname)
      return;

    this.props.registration(nickname, name, password);
  }


  render() {
    const {
      nickname,
      name,
      password,
      password2
    } = this.state;

    const isNicknameActive = nickname !== '';
    const isNameActive = name !== '';
    const isPasswordActive = password !== '';
    const isPassword2Active = password2 !== '';

    return (
      <div className="registration-container">
        <form className="registration">
          <div className="registration__logo" />
           <div className="input-box registration__input-box registration__input-box_nickname">
            <input
              className={ cn(
                "input registration__input",
                {"registration__input_typing": isNicknameActive}
              )}
              value={nickname}
              onChange={this.handleNicknameInput}
            />
            <label
              className={ cn(
                "registration__label",
                {"registration__label_small": isNicknameActive}
              )}>
              Придумайте логин
            </label>
          </div>
          <div className="input-box registration__input-box registration__input-box_name">
            <input
              className={ cn(
                "input registration__input",
                {"registration__input_typing": isNameActive}
              )}
              value={name}
              onChange={this.handleNameInput}
            />
            <label
              className={ cn(
                "registration__label",
                {"registration__label_small": isNameActive}
              )}>
              Ваше имя
            </label>
          </div>
          <div className="input-box registration__input-box registration__input-box_password">
            <input
              className={ cn(
                "input registration__input",
                {"registration__input_typing": isPasswordActive}
              )}
              type="password"
              value={password}
              onChange={this.handlePasswordInput}
              onBlur={this.checkPassword}
            />
            <label
              className={ cn(
                "registration__label",
                {"registration__label_small": isPasswordActive}
              )}>
              Пароль
            </label>
          </div>
          <div className={ cn(
            "input-box",
            "registration__input-box",
            "registration__input-box_password-check",
            {"registration__input-box_fail": !this.state.checkPassword && isPassword2Active}
          )}>
            <input
              className={ cn(
                "input registration__input",
                {"registration__input_typing": isPassword2Active}
              )}
              type="password"
              value={password2}
              onChange={this.handlePassword2Input}
              onBlur={this.checkPassword}
            />
            <label
              className={ cn(
                "registration__label",
                {"registration__label_small": isPassword2Active},
                {"registration__label_fail": !this.state.checkPassword && isPassword2Active}
              )}>
              Повторите пароль
            </label>
          </div>
          <CustomButton
            className={ cn(
              "registration__registration-button",
              {"registration__registration-button_disactive":
                !isNicknameActive ||
                !isPasswordActive ||
                !isPassword2Active ||
                !this.state.checkPassword
              })
            }
            isActive={false}
            textDisactive="Зарегистрироваться"
            onClick={(e) => this.handleClick(e, nickname, name, password)}
          />
          <Link to="/" className="registration__login-link">
            <CustomButton
              className="registration__login-button"
              isActive={true}
              textActive="Вход для пользователей"
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default Registration;
import React, { Component } from 'react';
import './index.css';
import cn from 'classnames';
import CustomButton from '../ui/CustomButton.js';

class Login extends Component {

  state = {
    isActive: false
  }

  activateButton = () => {
    this.setState({
      isActive: (document.querySelector('.login__input').value !== "")
    });
  }

  render() {
    const { handleEnter } = this.props;
    return (
      <div className="login-container">
        <form className="login">
          <div className="login__logo" />
           <div className="input-box login__input-box">
            <input
              className={ cn("input login__input", {"login__input_typing": this.state.isActive}) }
              onChange={this.activateButton}
            />
            <label className={ cn("login__label", {"login__label_small": this.state.isActive}) }>
              Имя пользователя
            </label>
          </div>
          <CustomButton
            className={ cn(
              "login__login-button",
              {"login__login-button_disactive": !this.state.isActive})
            }
            isActive={false}
            textDisactive="Перейти"
            handleClick={handleEnter}
          />
        </form>
      </div>
    );
  }
}

export default Login;
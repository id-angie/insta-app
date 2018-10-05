import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import IndexPage from './IndexPage.js';
import ProfilePage from './ProfilePage.js';
import users from '../users.json';

import './App.css';

moment.locale('ru');


class App extends Component {
  state = {
    user: null
  };

  setUser = (e) => {
    e.preventDefault();
    const id = document.querySelector('.login__input').value;
    const user = users.find((user) => user.id === id);
    if (user) {
      this.setState({
        user: user
      });
    } else
    alert('Пользователь не найден!');
  }

  logout = (e) => {
    e.preventDefault();
    this.setState({
      user: null
    });
  }

  toggleFollow = () => {
    if (this.state.user.isFollow === false || window.confirm("Отписаться?")) {
      const {
        user
      } = this.state;
      user.isFollow = !user.isFollow;

      this.setState({
        user: user
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.user ?
          <ProfilePage user={this.state.user} logout={this.logout} toggleFollow={this.toggleFollow} /> :
          <IndexPage handleEnter={this.setUser} />
        }
      </div>
      );
  }
}

export default App;
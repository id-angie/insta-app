import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import IndexPage from './IndexPage.js';
import ProfilePage from './ProfilePage.js';
import users from '../users.json';

import './App.scss';

moment.locale('ru');


class App extends Component {
  state = {
    user: null
  };

  setUser = (id) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      this.setState({
        user: user
      });
    } else
    alert('Пользователь не найден!');
  }

  logout = () => {
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
          <IndexPage setUser={this.setUser} />
        }
      </div>
      );
  }
}

export default App;
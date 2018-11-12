import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import IndexPage from './IndexPage.js';
import ProfilePage from './ProfilePage.js';
import users from '../users.json';
import Login from './login';
import ProfileContainer from './ProfileContainer.js';

import './App.scss';

moment.locale('ru');


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/user/:nickname' component={ProfileContainer} />
          <Route path='/login' render={() => <IndexPage Component={Login} />} />
        </div>
      </Router>
      );
  }
}

export default App;
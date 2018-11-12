import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import IndexPage from './IndexPage.js';
import Login from './login';
import Registration from './registration';
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
          <Route path='/registration' render={() => <IndexPage Component={Registration} />} />
        </div>
      </Router>
      );
  }
}

export default App;
import React from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/ru';
import ProfilePage from './ProfilePage.js';
moment.locale('ru');

const App = () => (
  <div className="App">
    <ProfilePage />
  </div>
);

export default App;
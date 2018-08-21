import React, { Component } from 'react';
import Header from './header';
import Profile from './profile';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Profile />
      </div>
    );
  }
}

export default App;
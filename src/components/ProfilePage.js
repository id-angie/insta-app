import React, { Component } from 'react';
import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';
import users from '../users.json';

class ProfilePage extends Component {
  render() {
    const random = (new Date()) %2 ===0 ? 0 : 1;
    return (
      <div className="ProfilePage">
        <Header />
        <Profile user={users[random]} />
        <Feed />
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
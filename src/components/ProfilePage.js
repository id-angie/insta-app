import React, { Component } from 'react';
import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';
import users from '../users.json';

class ProfilePage extends Component {
  state = {
    isFollow: users[0].isFollow
  };

  toggleFollow = () => {
    (this.state.isFollow === false || window.confirm("Отписаться?")) &&
      this.setState({
       isFollow: !this.state.isFollow
      });
  }

  render() {
    return (
      <div className="ProfilePage">
        <Header />
        <Profile user={users[0]} isFollow={this.state.isFollow} handleClick={this.toggleFollow} />
        <Feed user={users[0]} isFollow={this.state.isFollow} handleClick={this.toggleFollow} />
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
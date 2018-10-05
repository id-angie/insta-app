import React, { Component } from 'react';
import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';

class ProfilePage extends Component {
  render() {
    return (
      <div className="ProfilePage">
        <Header logout={this.props.logout} />
        <Profile user={this.props.user} handleClick={this.props.toggleFollow} />
        <Feed user={this.props.user} handleClick={this.props.toggleFollow} />
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
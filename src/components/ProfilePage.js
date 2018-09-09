import React, { Component } from 'react';
import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';

class ProfilePage extends Component {
  state = {
    user: this.props.user
  };

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
    const {
      user
    } = this.state;

    return (
      <div className="ProfilePage">
        <Header />
        <Profile user={user} handleClick={this.toggleFollow} />
        <Feed user={user} handleClick={this.toggleFollow} />
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
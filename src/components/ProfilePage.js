import React, { Component } from 'react';

import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';
import * as api from '../api/users';

class ProfilePage extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    api.showUser(this.props.userId)
      .then((body) => {
        this.setState({
          user: body.data.user
        })
      })

      .catch((error) => {
        console.log(error)
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      api.showUser(this.props.userId)
        .then((body) => {
          this.setState({
            user: body.data.user
          })
        })
    }
  }

  render() {
    const {
      userId,
      currentUser,
      isFollow,
      toggleFollow
    } = this.props;

    const {
      user
    } = this.state;

    if (!userId) {
      return (
        <div>
          User not selected
        </div>
      );
    }

    return (
      <div className="profile-page">
        <Header />
        { user ?
          <>
            <Profile user={user} currentUser={currentUser} isFollow={isFollow} toggleFollow={toggleFollow} />
            <Feed user={user} currentUser={currentUser} isFollow={isFollow} toggleFollow={toggleFollow} />
          </> :
          <div className="loading">
            Loading...
          </div>
        }
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
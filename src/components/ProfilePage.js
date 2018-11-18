import React, { Component } from 'react';

import Header from './header';
import Profile from './profile';
import Feed from './feed';
import Footer from './footer';

class ProfilePage extends Component {

  loadData = () => {
    this.props.fetchUser(this.props.userId);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  render() {
    const {
      user,
      currentUser,
      isFollow,
      toggleFollow,
      toggleLike,
      toggleSave,
      addComment,
      deleteComment
    } = this.props;

    if (!user) {
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
            <Feed
              user={user}
              currentUser={currentUser}
              isFollow={isFollow}
              toggleFollow={toggleFollow}
              toggleLike={toggleLike}
              toggleSave={toggleSave}
              addComment={addComment}
              deleteComment={deleteComment}
            />
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
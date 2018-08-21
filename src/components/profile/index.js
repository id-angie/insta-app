import React, { Component } from 'react';
import './index.css';
import avatar from './avatar.png'

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="container">
          <img src={avatar} className="avatar" />
          <div className="profile-info">
            <div>
              <p>Zamarawka</p>
              <p>Подписки</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
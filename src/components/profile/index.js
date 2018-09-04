import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';
import CustomButton from '../ui/CustomButton';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      about: PropTypes.string,
      avatar: PropTypes.string,
      isFollow: PropTypes.bool,
      accountData: PropTypes.shape({
        posts: PropTypes.number,
        following: PropTypes.number,
        followers: PropTypes.number
      })
    })
  };

  static defaultProps = {
    user: {
      id: 'unknown',
      name: '',
      about: '',
      avatar: '',
      isFollow: false,
      accountData: {
        posts: 0,
        following: 0,
        followers: 0
      }
    }
  };

  render() {
    const { user, isFollow, handleClick } = this.props;
    return (
      <div>
        <div className="profile">
          <div className="container">
            <div className={ cn("avatar", user.avatar) }>
            </div>
            <div className="profile__info">
              <div className="profile__row">
                <div className="profile__user-name">{ user.id }</div>
                <CustomButton
                className="profile__follow-button ml20"
                  isActive={isFollow}
                  textActive="Подписки"
                  textDisactive="Подписаться"
                  handleClick={handleClick}
                >
                </CustomButton>
              </div>
              <div className="profile__row">
                <div>
                  <b>{ user.accountData.posts }</b> публикаций
                </div>
                <div className="ml40">
                  <b>{ user.accountData.followers }</b> подписчиков
                </div>
                <div className="ml40">
                  Подписки: <b>{ user.accountData.following }</b>
                </div>
              </div>
              <div className="profile__user-data">
                <b>{ user.name }</b><br />
                { user.about }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
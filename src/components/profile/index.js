import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CustomButton from '../ui/CustomButton';

import './index.scss';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      nickname: PropTypes.string,
      name: PropTypes.string,
      about: PropTypes.string,
      avatar: PropTypes.string,
      followers: PropTypes.array,
      following: PropTypes.array,
      accountData: PropTypes.shape({
        following: PropTypes.number,
        followers: PropTypes.number
      }),
      feed: PropTypes.shape({
        posts: PropTypes.array,
        tagged: PropTypes.array
      })
    })
  };

  static defaultProps = {
    user: {
      nickname: 'unknown',
      name: '',
      about: '',
      avatar: '',
      followers: [],
      following: [],
      accountData: {
        following: 0,
        followers: 0
      },
      feed: {
        posts: [],
        tagged: []
      }
    }
  };

  render() {
    const { user, currentUser, isFollow, toggleFollow } = this.props;
    return (
      <div>
        <div className="profile">
          <div className="container">
            <div
              className={ cn("avatar profile__avatar_fullscreen", user.avatar, {
                "profile__avatar_default": !user.avatar
              }) }
            />
            <div className="profile__info profile__info_fullscreen">
              <div className="profile__row">
                <div className="profile__user-name">{ user.nickname }</div>
                {(currentUser && currentUser.nickname === user.nickname) ?
                  <CustomButton
                    className="profile__follow-button"
                    isActive={true}
                    textActive="Это Вы"
                    onClick={() => {}}
                  >
                  </CustomButton> :
                  <CustomButton
                    className="profile__follow-button"
                    isActive={isFollow}
                    textActive="Подписки"
                    textDisactive="Подписаться"
                    onClick={() => toggleFollow(user.nickname, isFollow)}
                  >
                  </CustomButton>
                }
              </div>
              <div className="profile__row">
                <div>
                  <b>{ user.feed.posts.length }</b> публикаций
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

            <div className="profile__info profile__info_mobile">
              <div className="profile__row profile__head">
                <div
                  className={ cn("avatar profile__avatar_mobile", user.avatar, {
                    "profile__avatar_default": !user.avatar
                  }) }
                />
                <div className="profile__column">
                  <div className="profile__user-name">{ user.nickname }</div>
                  {(currentUser && currentUser.nickname === user.nickname) ?
                    <CustomButton
                      className="profile__follow-button"
                      isActive={true}
                      textActive="Это Вы"
                      onClick={() => {}}
                    >
                    </CustomButton> :
                    <CustomButton
                      className="profile__follow-button"
                      isActive={isFollow}
                      textActive="Подписки"
                      textDisactive="Подписаться"
                      onClick={() => toggleFollow(currentUser, user.nickname , isFollow)}
                    >
                    </CustomButton>
                  }
                </div>
              </div>
              <div className="profile__user-data">
                <b>{ user.name }</b><br />
                { user.about }
              </div>
              <div className="profile__row profile__follows-info">
                <div className="profile__follows-info-tab">
                  <b>{ user.feed.posts.length }</b> публикаций
                </div>
                <div className="profile__follows-info-tab">
                  <b>{ user.accountData.followers }</b> подписчиков
                </div>
                <div className="profile__follows-info-tab">
                  Подписки: <b>{ user.accountData.following }</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
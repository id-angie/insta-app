import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CustomButton from '../ui/CustomButton';

import './index.scss';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      about: PropTypes.string,
      avatar: PropTypes.string,
      counters: PropTypes.shape({
        posts:PropTypes.number
      }),
      following: PropTypes.array,
      followers: PropTypes.array,
      feed: PropTypes.array
    })
  };

  static defaultProps = {
    user: {
      _id: 'undefined',
      nickname: 'unknown',
      name: '',
      about: '',
      avatar: null,
      counters: {
        posts: 0
      },
      following: [],
      followers: [],
      feed: []
    }
  };

  render() {
    const { user, currentUser, isFollow, toggleFollow } = this.props;
    const apiEndpoint = process.env.REACT_APP_API;
    const style = (user.avatar !== null) ? {
      backgroundImage: `url(${apiEndpoint}${user.avatar})`,
      backgroundSize: "cover"
    } :
    {};
    return (
      <div>
        <div className="profile">
          <div className="container">
            <div
              className={ cn("avatar profile__avatar_fullscreen", {
                "profile__avatar_default": user.avatar === null
              }) }
              style={style}
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
                    onClick={() => toggleFollow(user._id, isFollow)}
                  >
                  </CustomButton>
                }
              </div>
              <div className="profile__row">
                <div>
                  <b>{ user.counters.posts }</b> публикаций
                </div>
                <div className="ml40">
                  <b>{ user.followers.length }</b> подписчиков
                </div>
                <div className="ml40">
                  Подписки: <b>{ user.following.length }</b>
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
                  className={ cn("avatar profile__avatar_mobile", {
                    "profile__avatar_default": user.avatar === null
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
                      onClick={() => toggleFollow(user._id , isFollow)}
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
                  <b>{ user.counters.posts }</b> публикаций
                </div>
                <div className="profile__follows-info-tab">
                  <b>{ user.followers.length }</b> подписчиков
                </div>
                <div className="profile__follows-info-tab">
                  Подписки: <b>{ user.following.length }</b>
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
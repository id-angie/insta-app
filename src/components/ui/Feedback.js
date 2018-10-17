import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './Feedback.css';

class Feedback extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      format: PropTypes.string,
      media: PropTypes.array,
      previewIndex: PropTypes.number,
      isSaved: PropTypes.bool,
      feedback: PropTypes.shape({
        views: PropTypes.number,
        likes: PropTypes.array,
        comments: PropTypes.array
      })
    }),
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
      }),
      feed: PropTypes.shape({
        posts: PropTypes.array,
        tagged: PropTypes.array
      })
    }),
    activateComment: PropTypes.func,
    toggleLike: PropTypes.func,
    toggleSave: PropTypes.func

  };

  static defaultProps = {
    post: {
      id: '',
      date: '',
      format: 'image',
      media: [],
      previewIndex: 0,
      isSaved: false,
      feedback: {
        views: 0,
        likes: [],
        comments: []
      }
    },
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
      },
      feed: {
        posts: [],
        tagged: []
      }
    },
    toggleLike: () => {},
    toggleSave: () => {}
  };

  render() {
    const isLiked = this.props.post.feedback.likes.some((id) =>
      (id === this.props.user.id)
    );
    const isSaved = this.props.post.isSaved;
    const {
      activateComment,
      toggleLike,
      toggleSave
    } = this.props;

    return (
      <div className="post-info__feedback">
        <div className="post-info__actions">
          <div className="post-info__actions-left">
            <div
              className={cn(
                "post-info__icon post-info__icon_like",
                {"post-info__icon_like-active" : isLiked}
              )}
              onClick={toggleLike}
            />
            <div
              className="post-info__icon post-info__icon_comment"
              onClick={activateComment}
            />
            <div
              className="post-info__icon post-info__icon_share"
              onClick={() => { alert('share') }}
            />
          </div>
          <div
            className={cn(
              "post-info__icon post-info__icon_save",
              {"post-info__icon post-info__icon_save-active": isSaved}
            )}
            onClick={toggleSave}
          />
        </div>
        <div className="post-info__likes">
          <b> {this.props.post.feedback.likes.length} отметок "Нравится"
          </b>
        </div>
      </div>
    );
  }
}

export default Feedback;
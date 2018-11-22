import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './Feedback.scss';

class Feedback extends Component {
  static propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      file: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      feedback: PropTypes.shape({
        likes: PropTypes.array,
        saves: PropTypes.array,
        comments: PropTypes.number
      }),
      comments: PropTypes.array
    }),
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
    }),
     activateComment: PropTypes.func,
     toggleLike: PropTypes.func,
     toggleSave: PropTypes.func
  };

  static defaultProps = {
    post: {
      _id: '',
      userId: '',
      file: '',
      createdAt: '',
      updatedAt: '',
      feedback: {
        likes: [],
        saves: [],
        comments: 0
      },
      comments: []
    },
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
    },
    activateComment: () => {},
    toggleLike: () => {},
    toggleSave: () => {}
  };

  render() {
    const {
      activateComment,
      toggleLike,
      toggleSave,
      className,
      post
    } = this.props;

    const isLiked = this.props.currentUser ||
    this.props.post.feedback.likes.some((user) =>
      user === this.props.currentUser._id
    );
    const isSaved = this.props.currentUser ||
      this.props.post.feedback.saves.some((user) =>
        user === this.props.currentUser._id
      );

    return (
      <div className={cn( "post-info__feedback", className )} >
        <div className="post-info__actions">
          <div className="post-info__actions-left">
            <div
              className={cn(
                "post-info__icon post-info__icon_like",
                {"post-info__icon_like-active" : isLiked}
              )}
              onClick={() => toggleLike(post._id, isLiked)}
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
            onClick={() => toggleSave(post._id, isSaved)}
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
import React, { Component } from 'react';
import cn from 'classnames';
//import PropTypes from 'prop-types';

import './Feedback.scss';

class Feedback extends Component {
  // static propTypes = {
  //   post: PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     date: PropTypes.string,
  //     media: PropTypes.array,
  //     feedback: PropTypes.shape({
  //       views: PropTypes.number,
  //       likes: PropTypes.array,
  //       comments: PropTypes.array
  //     })
  //   }),
  //   user: PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //     nickname: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     following: PropTypes.array,
  //     followers: PropTypes.array,
  //     about: PropTypes.string,
  //     avatar: PropTypes.string,
  //     feed: PropTypes.shape({
  //       posts: PropTypes.array,
  //       tagged: PropTypes.array
  //     })
  //   }),
  //   activateComment: PropTypes.func,
  //   toggleLike: PropTypes.func,
  //   toggleSave: PropTypes.func

  // };

  // static defaultProps = {
  //   post: {
  //     id: '',
  //     date: '',
  //     media: [],
  //     feedback: {
  //       views: 0,
  //       likes: [],
  //       comments: []
  //     }
  //   },
  //   user: {
  //     _id: 'undefined',
  //     nickname: 'unknown',
  //     name: '',
  //     following: [],
  //     followers: [],
  //     about: '',
  //     avatar: '',
  //     feed: {
  //       posts: [],
  //       tagged: []
  //     }
  //   },
  //   toggleLike: () => {},
  //   toggleSave: () => {}
  // };

  isLiked = () => this.props.currentUser ?
    this.props.post.feedback.likes.some((id) =>
      (id === this.props.currentUser.nickname)
    ) : false;

  isSaved = () => this.props.currentUser ?
    this.props.post.feedback.saves.some((id) =>
      (id === this.props.currentUser.nickname)
    ) : false;

  render() {
    const isLiked = this.isLiked();
    const isSaved = this.isSaved();
    const {
      activateComment,
      toggleLike,
      toggleSave,
      className,
      post
    } = this.props;

    return (
      <div className={cn( "post-info__feedback", className )} >
        <div className="post-info__actions">
          <div className="post-info__actions-left">
            <div
              className={cn(
                "post-info__icon post-info__icon_like",
                {"post-info__icon_like-active" : isLiked}
              )}
              onClick={() => toggleLike(post.id, isLiked)}
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
            onClick={() => toggleSave(post.id, isSaved)}
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
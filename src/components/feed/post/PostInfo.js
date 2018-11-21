import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';

import CustomButton from '../../ui/CustomButton.js';
import Feedback from '../../ui/Feedback.js';
import prevent from '../../../utils/prevent.js';
import { showCommentsList } from '../../../actions/user.js';

import './PostInfo.scss';

class PostInfo extends Component {

  input = null;

  state = {
    isCommentInput: false
  };

  componentDidMount() {
    this.props.showCommentsList(this.props.post._id);
  }

  activateComment = () => {
    this.setState({
      isCommentInput: true
    }, () => {
      this.input.focus();
    });
  }

  hasUserRights = (comment, currentUser, user) => {
    if ((currentUser === null) ||
      ((comment.commiter.nickname !== currentUser.nickname) && (currentUser.nickname !== user.nickname))
    )
      return false;
    return true;
  }

  render() {
    const {
      isCommentInput
    } = this.state;

    const { user, currentUser, isFollow, toggleFollow } = this.props;
    const comments = this.props.post.comments || [];

    const apiEndpoint = process.env.REACT_APP_API;
    const style = (user.avatar !== null) ? {
      backgroundImage: `url(${apiEndpoint}${user.avatar})`,
      backgroundSize: "cover"
    } :
    {};

    return (
      <div className="post-info">
        <div className='post-info__data-zone'>
          <div className="post-info__header">
            <div className={ cn("post-info__avatar", {
              "post-info__avatar_default": user.avatar === null
            })}
              style={style}
            />
            <div className="post-info__user-name">{user.nickname}</div>
            <div className="post-info__dot">•</div>
            {currentUser && user.nickname === currentUser.nickname ?
              <CustomButton
                className="post-info__follow-button"
                isActive={true}
                textActive="Это Вы"
                onClick={() => {}}
              >
              </CustomButton> :
              <CustomButton
                className="post-info__follow-button"
                isActive={isFollow}
                textActive="Подписки"
                textDisactive="Подписаться"
                onClick={() => toggleFollow(user._id , isFollow)}
              >
              </CustomButton>
            }
          </div>
          <div
            className="fullscreen-post__img fullscreen-post__img_mobile"
            style={{ backgroundImage: `url(${this.props.img})` }}
          />
          <Feedback
            className='post-info__feedback_mobile'
            post={this.props.post}
            user={user}
            currentUser={currentUser}
            activateComment={this.activateComment}
            toggleLike={this.props.toggleLike}
            toggleSave={this.props.toggleSave}
          />
          {(comments) &&
            <ul className="post-info__comments">
            {
              comments.map((comment) =>
              <li
                key={comment._id}
                className="post-info__comments-li"
                id={comment._id}
              >
                <span>
                  <b>{comment.commiter.nickname}</b> {comment.text}
                </span>
                {(this.hasUserRights(comment, this.props.currentUser, this.props.user)) &&
                <span
                  className="post-info__comments-delete"
                  onClick={prevent(() =>
                    this.props.deleteComment(this.props.post._id, comment._id)
                  )}
                >
                  ×
                </span>
              }
              </li>
              )
            }
          </ul>}
          <time className="post-info__date post-info__date_mobile">
            { moment(this.props.post.date).format('LL') }
          </time>
        </div>
        <div className='post-info__feedback-zone'>
          <div className="post-info__feedback-row">
            <Feedback
              className="post-info__feedback_fullscreen"
              post={this.props.post}
              user={user}
              currentUser={currentUser}
              activateComment={this.activateComment}
              toggleLike={this.props.toggleLike}
              toggleSave={this.props.toggleSave}
            />
            <time className="post-info__date post-info__date_fullscreen">
              { moment(this.props.post.date).format('LL') }
            </time>
          </div>
          <div className={cn('post-info__add-comment', {
            'post-info__add-comment_disabled': !isCommentInput
          })}>
            <form onSubmit={prevent(() => {
              this.props.addComment(this.props.post._id, this.input.value);
              this.input.value = null;
            })} >
              <input
                type="text"
                ref={(el) => this.input = el}
                className="post-info__add-comment-input"
                placeholder="Добавьте комментарий..."
              />
              <button type='submit' hidden />
            </form>
            <div className="post-info__add-comment-actions">
              <b>...</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    post: state.user.user.feed.find((post) => post._id === props.postId)
  }),
  {
    showCommentsList
  }
)(PostInfo);
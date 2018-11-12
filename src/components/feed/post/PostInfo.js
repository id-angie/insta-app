import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';

import CustomButton from '../../ui/CustomButton.js';
import Feedback from '../../ui/Feedback.js';

import './PostInfo.scss';

class PostInfo extends Component {

  input = null;

  state = {
    isCommentInput: false
  };

  activateComment = () => {
    this.setState({
      isCommentInput: true
    }, () => {
      this.input.focus();
    });
  }

  hasUserRights = (comment, currentUser, user) => {
    if ((currentUser === null) ||
      ((comment.commiter !== currentUser.nickname) && (currentUser.nickname !== user.nickname))
    )
      return false;
    return true;
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) this.props.addComment(e, this.input, this.props.currentUser);
  }

  render() {
    const {
      isCommentInput
    } = this.state;

    const { user, currentUser, isFollow, toggleFollow } = this.props;

    return (
      <div className="post-info">
        <div className='post-info__data-zone'>
          <div className="post-info__header">
            <div className={ cn("post-info__avatar", user.avatar)} />
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
                onClick={() => toggleFollow(currentUser, user.nickname , isFollow)}
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
          <ul className="post-info__comments">
            {this.props.post.feedback.comments.map((comment) =>
              <li
                key={comment.id}
                className="post-info__comments-li"
                id={comment.id}
              >
                <span>
                  <b>{comment.commiter}</b> {comment.text}
                </span>
                {(this.hasUserRights(comment, this.props.currentUser, this.props.user)) &&
                <span
                  className="post-info__comments-delete"
                  onClick={this.props.deleteComment}
                >
                  ×
                </span>
              }
              </li>
              )
            }
          </ul>
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
            <form onSubmit={(e) => this.props.addComment(e, this.input, currentUser)} onKeyDown={(e) => this.handleEnter(e)}>
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

export default PostInfo;
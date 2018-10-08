import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';

import CustomButton from '../../ui/CustomButton.js';
import Feedback from '../../ui/Feedback.js';

import './PostInfo.css';

class PostInfo extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className="post-info">
        <div className="post-info__header">
          <div className={ cn("post-info__avatar", this.props.user.avatar)} />
          <div className="post-info__user-name">{this.props.user.id}</div>
          <div className="post-info__dot">•</div>
          <CustomButton
            className="post-info__follow-button"
            isActive={this.props.user.isFollow}
            textActive="Подписки"
            textDisactive="Подписаться"
            handleClick={handleClick}
          >
          </CustomButton>
        </div>
        <div
          className="fullscreen-post__img fullscreen-post__img_mobile"
          style={{ backgroundImage: `url(${this.props.img})` }}
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
              <span
                className="post-info__comments-delete"
                onClick={this.props.deleteComment}
              >
                ×
              </span>
            </li>
            )
          }
        </ul>
        <time className="post-info__date post-info__date_mobile">
          { moment(this.props.post.date).format('LL') }
        </time>
        <div className="post-info__feedback-row">
          <Feedback
            post={this.props.post}
            user={this.props.user}
          />
          <time className="post-info__date post-info__date_fullscreen">
            { moment(this.props.post.date).format('LL') }
          </time>
        </div>
        <div className="post-info__add-comment">
          <form onSubmit={this.props.addComment}>
            <input
              type="text"
              className="post-info__add-comment-input"
              placeholder="Добавьте комментарий..."
            />
          </form>
            <div className="post-info__add-comment-actions">
              <b>...</b>
            </div>
          </div>
      </div>
    );
  }
}

export default PostInfo;
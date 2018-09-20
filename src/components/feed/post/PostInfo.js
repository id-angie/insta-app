import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';
import './PostInfo.css';
import CustomButton from '../../ui/CustomButton.js';
import Feedback from '../../ui/Feedback.js';

class PostInfo extends Component {
  state = {
    user: this.props.user,
    post: this.props.post,
    img: this.props.img
  };

  addComment = (e) => {
    e.preventDefault();
    const { user, post } = this.state;
    const newComment = e.target.children[0].value;
    e.target.children[0].value = null;
    post.feedback.comments.push({
      commiter: user.id,
      text: newComment,
      date: new Date(),
      likes: 0
    });
    this.setState({
      user: user
    });
  }

  deleteComment = (e) => {
    e.preventDefault();
    const { user, post } = this.state;
    const comments = post.feedback.comments;
    const targetCommentId = e.target.parentNode.id;
    const targetComment = comments.filter((comment) => {
      return comment.date === targetCommentId;
    });
    const targetCommentIndex = comments.indexOf(targetComment[0]);
    comments.splice(targetCommentIndex, 1);
    this.setState({
      user: user
    });
  }

  render() {
    const { user, post } = this.state;
    const { handleClick } = this.props;
    return (
      <div className="post-info">
        <div className="post-info__header">
          <div className={ cn("post-info__avatar", user.avatar)} />
          <div className="post-info__user-name">{user.id}</div>
          <div className="post-info__dot">•</div>
          <CustomButton
            className="post-info__follow-button"
            isActive={user.isFollow}
            textActive="Подписки"
            textDisactive="Подписаться"
            handleClick={handleClick}
          >
          </CustomButton>
        </div>
        <div
          className="fullscreen-post__img fullscreen-post__img_mobile"
          style={{ backgroundImage: `url(${this.state.img})` }}
        />
        <ul className="post-info__comments">
          {post.feedback.comments.map((comment) =>
            <li
              key={comment.date}
              className="post-info__comments-li"
              id={comment.date}
            >
              <span>
                <b>{comment.commiter}</b> {comment.text}
              </span>
              <span
                className="post-info__comments-delete"
                onClick={this.deleteComment}
              >
                ×
              </span>
            </li>
            )
          }
        </ul>
        <div className="post-info__feedback-row">
          <Feedback
            post={post}
            user={user}
          />
          <time className="post-info__date">
            { moment(post.date).format('LL') }
          </time>
        </div>
        <div className="post-info__add-comment post-info__add-comment_fullscreen">
          <form onSubmit={this.addComment}>
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
import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';
import './PostInfo.css';
import CustomButton from '../../ui/CustomButton.js'

class PostInfo extends Component {
  state = {
    user: this.props.user,
    post: this.props.post
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

  toggleLike = () => {
    const { user, post } = this.state;
    const indexOfLike = post.feedback.likes.indexOf(user.id);
    if (indexOfLike === -1)
      post.feedback.likes.push(user.id);
    else
      post.feedback.likes.splice(indexOfLike, 1);
    this.setState({
      post: post
    });
  }

  toggleSave = () => {
    const { post } = this.state;
    post.isSaved = !post.isSaved;
    this.setState({
      post: post
    });
  }

  render() {
    const { user, post } = this.state;
    const { handleClick } = this.props;
    const isLiked = post.feedback.likes.some((id) => (id === user.id));
    const isSaved = post.isSaved;
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
        <ul className="post-info__comments">
          {post.feedback.comments.map((comment) =>
            <li key={comment.date}>
              <b>{comment.commiter}</b> {comment.text}
            </li>
            )
          }
        </ul>
        <div className="post-info__feedback">
          <div className="post-info__actions">
            <div className="post-info__actions-left">
              <div
                className={cn(
                  "post-info__icon post-info__icon_like",
                  {"post-info__icon_like-active" : isLiked}
                )}
                onClick={this.toggleLike}
              />
              <div
                className="post-info__icon post-info__icon_comment"
                onClick={() =>
                  document.querySelector('.post-info__add-comment-input').focus()
                }
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
              onClick={this.toggleSave}
            />
          </div>
          <div className="post-info__likes">
            <b> {post.feedback.likes.length} отметок "Нравится"
            </b>
          </div>
          <time className="post-info__date">
            { moment(post.date).format('LL') }
          </time>
        </div>
          <div className="post-info__add-comment">
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
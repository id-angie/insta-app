import React, { Component } from 'react';
import cn from 'classnames';
import moment from 'moment';
import './PostInfo.css';
import CustomButton from '../../ui/CustomButton.js'

class PostInfo extends Component {
  state = {
    isLiked: this.props.post.feedback.likes.some((id) => (id === "id_angie")),
    isSaved: this.props.post.isSaved
  };

  addComment = (e) => {
    e.preventDefault();
    const newComment = document.createElement('li');
    newComment.innerHTML = "<b>id_angie </b>" + e.target.children[0].value;
    document.querySelector('.post-info__comments').appendChild(newComment);
    e.target.children[0].value = null;
  }

  render() {
    const props = this.props;
    return (
      <div className="post-info">
        <div className="post-info__header">
          <div className={ cn("post-info__avatar", props.user.avatar)} />
          <div className="post-info__user-name">{props.user.id}</div>
          <div className="post-info__dot">•</div>
          <CustomButton
            className="post-info__follow-button"
            isActive={props.isFollow}
            textActive="Подписки"
            textDisactive="Подписаться"
            handleClick={props.handleClick}
          >
          </CustomButton>
        </div>
        <ul className="post-info__comments">
          {props.post.feedback.comments.map((comment) =>
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
                  {"post-info__icon_like-active" : this.state.isLiked}
                )}
                onClick={() => this.setState({isLiked: !this.state.isLiked})}
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
                {"post-info__icon post-info__icon_save-active": this.state.isSaved}
              )}
              onClick={() => this.setState({isSaved: !this.state.isSaved})}
            />
          </div>
          <div className="post-info__likes">
            <b> {props.post.feedback.likes.length} отметок "Нравится"
            </b>
          </div>
          <time className="post-info__date">
            { moment(props.post.date).format('LL') }
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
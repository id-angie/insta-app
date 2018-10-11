import React, { Component } from 'react';
import cn from 'classnames';

import './Feedback.css';

class Feedback extends Component {
  state = {
    post: this.props.post,
    user: this.props.user
  };

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
    const isLiked = this.state.post.feedback.likes.some((id) => (id === this.state.user.id));
    const isSaved = this.state.post.isSaved;

    const {
      activateComment
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
              onClick={this.toggleLike}
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
            onClick={this.toggleSave}
          />
        </div>
        <div className="post-info__likes">
          <b> {this.state.post.feedback.likes.length} отметок "Нравится"
          </b>
        </div>
      </div>
    );
  }
}

export default Feedback;
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './Feedback.css';

class Feedback extends Component {
  static propTypes = {
    activateComment: PropTypes.func
  };

  static defaultProps = {
    activateComment: () => {}
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
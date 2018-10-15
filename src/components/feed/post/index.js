import React, { Component } from 'react';
import cn from 'classnames';

import FullscreenPost from './FullscreenPost.js'

import './index.css';

class Post extends Component {
  state = {
    feedback: 'hidden'
  };

  showFeedback = () => {
    this.setState({
      feedback: 'show'
    });
  }

  hideFeedback = () => {
    this.setState({
      feedback: 'hidden'
    });
  }

  render() {
    const { post, openedPost } = this.props;
    const img = require(`../../../assets/${post.media[post.previewIndex]}`);
    return (
      <div className="post-container">
        <div
          className="post mb40"
          style={{ backgroundImage: `url(${img})` }}
          id={post.id}
        >
          <div
            className="post__hover-overlay"
            onMouseOver={this.showFeedback}
            onMouseOut={this.hideFeedback}
            onClick={() => this.props.showFullPost(post.id)}
          >
            <div
              className={cn("post__feedback-layout",
                {"post__feedback-layout_hidden": this.state.feedback === 'hidden'}
              )}
            >
              <div className="post__feedback post__feedback_likes">
              </div>
              <span>{post.feedback.likes.length}</span>
              <div className="post__feedback post__feedback_comments">
              </div>
              <span>{post.feedback.comments.length}</span>
            </div>
          </div>
        </div>
        {openedPost && openedPost.id === post.id &&
          <FullscreenPost
            user={this.props.user}
            post={post}
            img={img}
            closeFullscreen={this.props.showPreview}
            isFollow={this.props.user.isFollow}
            toggleFollow={this.props.toggleFollow}
            showNextPost={this.props.showNextPost}
            showPrevPost={this.props.showPrevPost}
            addComment={this.props.addComment}
            deleteComment={this.props.deleteComment}
            toggleLike={this.props.toggleLike}
            toggleSave={this.props.toggleSave}
          />
        }
      </div>
    );
  }
}

export default Post;
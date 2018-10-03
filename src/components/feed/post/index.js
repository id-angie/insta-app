import React, { Component } from 'react';
import cn from 'classnames';
import './index.css';
import FullscreenPost from './FullscreenPost.js'

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
    const { user, openedPost, post, handleClick, showPrevPost, showNextPost, showFullPost, showPreview } = this.props;
    const { feedback } = this.state;
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
            onClick={() => showFullPost(post.id)}
          >
            <div
              className={cn("post__feedback-layout",
                {"post__feedback-layout_hidden": feedback === 'hidden'}
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
            user={user}
            post={post}
            img={img}
            closeFullscreen={showPreview}
            isFollow={user.isFollow}
            handleClick={handleClick}
            showNextPost={showNextPost}
            showPrevPost={showPrevPost}
          />
        }
      </div>
    );
  }
}

export default Post;
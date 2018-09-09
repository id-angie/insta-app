import React, { Component } from 'react';
import cn from 'classnames';
import './Post.css';
import FullscreenPost from './FullscreenPost.js'

class Post extends Component {
  state = {
    view: 'preview',
    feedback: 'hidden'
  };

  showPreview = () => {
    this.setState({
      view: 'preview'
    });
  }

  showFullPost = () => {
    this.setState({
      view: 'full'
    });
  }

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
    const { user, post, handleClick } = this.props;
    const { view, feedback } = this.state;
    const img = require(`../../../assets/${post.media[post.previewIndex]}`);

    return (
      <div
        className="post mb40"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div
          className="post__hover-overlay"
          onMouseOver={this.showFeedback}
          onMouseOut={this.hideFeedback}
          onClick={this.showFullPost}
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
        {view === 'full' &&
          <FullscreenPost
            user={user}
            post={post}
            img={img}
            closeFullscreen={this.showPreview}
            isFollow={user.isFollow}
            handleClick={handleClick}
          />
        }
      </div>
    );
  }
}

export default Post;
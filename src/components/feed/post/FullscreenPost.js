import React, { Component } from 'react';

import PostInfo from './PostInfo.js';

import './FullscreenPost.css';

class FullscreenPost extends Component {

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className="modal">
        <div
          className="fullscreen-post-container"
          onClick={this.props.closeFullscreen}
        >
          <div
            className=
              "fullscreen-post__navigation fullscreen-post__navigation_previous"
            onClick={(e) => this.props.showPrevPost(e, this.props.post.id)}
          />
          <div
            className="fullscreen-post"
            onClick={ (e) => {e.stopPropagation()} }
          >
            <div className=
              "fullscreen-post__img-container
              fullscreen-post__img-container_fullscreen"
            >
              <div
                className="fullscreen-post__img fullscreen-post__img_fullscreen"
                style={{ backgroundImage: `url(${this.props.img})` }}
              />
            </div>
            <PostInfo
              user={this.props.user}
              post={this.props.post}
              handleClick={this.props.handleClick}
              img={this.props.img}
              addComment={this.props.addComment}
              deleteComment={this.props.deleteComment}
            />
          </div>
          <div
            className="fullscreen-post__navigation fullscreen-post__navigation_next"
            onClick={(e) => this.props.showNextPost(e, this.props.post.id)}
          />
          <button
            className="fullscreen-post__navigation fullscreen-post__navigation_close"
          >
            <span>×</span>
          </button>
        </div>
      </div>
    );
  }
}

export default FullscreenPost;
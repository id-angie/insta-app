import React, { Component } from 'react';
import ReactModal from 'react-modal';

import PostInfo from './PostInfo.js';

import './FullscreenPost.scss';

ReactModal.setAppElement('#root');

class FullscreenPost extends Component {

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <ReactModal
        isOpen={true}
        className="react-modal__content"
        overlayClassName="react-modal__overlay"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
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
              toggleFollow={this.props.toggleFollow}
              img={this.props.img}
              addComment={this.props.addComment}
              deleteComment={this.props.deleteComment}
              toggleLike={this.props.toggleLike}
              toggleSave={this.props.toggleSave}
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
      </ReactModal>
    );
  }
}

export default FullscreenPost;
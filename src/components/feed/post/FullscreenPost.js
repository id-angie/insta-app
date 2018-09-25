import React from 'react';
import './FullscreenPost.css';
import PostInfo from './PostInfo.js';

const FullscreenPost = (props) => (
  <div>
    <div className="modal">
    </div>
    <div className="fullscreen-post-container" onClick={props.closeFullscreen}>
      <div
        className="fullscreen-post__navigation fullscreen-post__navigation_previous"
        onClick={() => alert('prev')}
      />
      <div
        className="fullscreen-post"
        onClick={ (e) => {e.stopPropagation()} }
      >
        <div className="fullscreen-post__img-container fullscreen-post__img-container_fullscreen">
          <div
            className="fullscreen-post__img fullscreen-post__img_fullscreen"
            style={{ backgroundImage: `url(${props.img})` }}
          />
        </div>
        <PostInfo user={props.user} post={props.post} handleClick={props.handleClick} img={props.img} />
      </div>
      <div
        className="fullscreen-post__navigation fullscreen-post__navigation_next"
        onClick={() => alert('next')}
      />
      <button className="fullscreen-post__navigation fullscreen-post__navigation_close">
        <span>×</span>
      </button>
    </div>
  </div>
);

export default FullscreenPost;
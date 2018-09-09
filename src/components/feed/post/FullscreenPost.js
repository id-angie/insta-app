import React from 'react';
import './FullscreenPost.css';
import PostInfo from './PostInfo.js';

const FullscreenPost = (props) => (
  <div>
    <div className="modal">
    </div>
    <div className="fullscreen-post-container" onClick={props.closeFullscreen}>
      <div
        className="fullscreen-post"
        onClick={ (e) => {e.stopPropagation()} }
      >
        <div
          className="fullscreen-post__img"
          style={{ backgroundImage: `url(${props.img})` }}
        />
        <PostInfo user={props.user} post={props.post} handleClick={props.handleClick} />
      </div>
      <button className="close">
        <span>×</span>
      </button>
    </div>
  </div>
);

export default FullscreenPost;
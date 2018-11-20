import React from 'react';

import FullscreenPost from './FullscreenPost.js'

import './index.scss';

const apiEndpoint = process.env.REACT_APP_API;

const Post = (props) => {
  const { post, openedPostId } = props;
  const img = `${apiEndpoint}${post.file}`;
  return (
    <div className="post-container">
      <div
        className="post"
        style={{ backgroundImage: `url(${img})` }}
        id={post._id}
      >
        <div
          className="post__hover-overlay"
          onClick={() => props.showFullPost(post._id)}
        >
          <div
            className="post__feedback-layout"
          >
            <div className="post__feedback post__feedback_likes">
            </div>
            <span>{post.feedback.likes.length}</span>
            <div className="post__feedback post__feedback_comments">
            </div>
            <span>{post.feedback.comments}</span>
          </div>
        </div>
      </div>
      {openedPostId === post._id &&
        <FullscreenPost
          user={props.user}
          post={post}
          img={img}
          closeFullscreen={props.showPreview}
          isFollow={props.isFollow}
          toggleFollow={props.toggleFollow}
          showNextPost={props.showNextPost}
          showPrevPost={props.showPrevPost}
          addComment={props.addComment}
          deleteComment={props.deleteComment}
          toggleLike={props.toggleLike}
          toggleSave={props.toggleSave}
          currentUser={props.currentUser}
        />
      }
    </div>
  );
}

export default connect(
  (state, props) =>({
    post: state.user.user.feed.find((post) => post._id === props.postId)
  })
)(Post);
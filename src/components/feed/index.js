import React, { Component } from 'react';
import './index.css';
import FeedState from './FeedState.js'
import Post from './post'
import tabs from '../../tabs.json';

class Feed extends Component {
  state = {
    view: 'posts',
    openedPost: null
  };

  getFeedContent = () => {
    return (
      this.state.view === 'posts' ?
      this.props.user.feed.posts :
      this.props.user.feed.tagged
    );
  }

  handleTab = (view) => {
    this.setState({
      view
    });
  }

  showPreview = () => {
    this.setState({
      openedPost: null
    });
  }

  showFullPost = (id) => {
    const feedContent = this.getFeedContent();
    const openThisPost = feedContent.find((post) => {
        return id === post.id;
      }
    );
    this.setState({
      openedPost: openThisPost
    });
  }

  showPrevPost = (e, id) => {
    const feedContent = this.getFeedContent();
    e.stopPropagation();
    const currentPost = feedContent.find((post) => {
        return id === post.id;
      }
    );
    const currentPostIndex = feedContent.indexOf(currentPost);
    this.setState({
      openedPost: feedContent[currentPostIndex - 1]
    });
  }

  showNextPost = (e, id) => {
    const feedContent = this.getFeedContent();
    e.stopPropagation();
    const currentPost = feedContent.find((post) => {
        return id === post.id;
      }
    );
    const currentPostIndex = feedContent.indexOf(currentPost);
    this.setState({
      openedPost: feedContent[currentPostIndex+ 1]
    });
  }

  addComment = (e) => {
    e.preventDefault();
    const newComment = e.target.children[0].value;
    e.target.children[0].value = null;
    this.state.openedPost.feedback.comments.push({
      id: new Date() + ' ' + Math.random(),
      commiter: this.props.user.id,
      text: newComment,
      date: new Date(),
      likes: 0
    });
    this.setState({
      openedPost: this.state.openedPost
    });
  }

  deleteComment = (e) => {
    e.preventDefault();
    const comments = this.state.openedPost.feedback.comments;
    const targetCommentId = e.target.parentNode.id;
    const targetComment = comments.find((comment) => {
      console.log(targetCommentId, comment.id);
      return comment.id === targetCommentId;
    });
    const targetCommentIndex = comments.indexOf(targetComment);
    comments.splice(targetCommentIndex, 1);
    this.setState({
      openedPost: this.state.openedPost
    });
  }

  render() {
    const { user, handleClick } = this.props;
    const feedContent = this.getFeedContent();
    return (
      <div className="feed">
        <div className="container">
          <div className="feed-flow">
            <FeedState
              tabs={tabs}
              view={this.state.view}
              onTab={this.handleTab}
            />
            {
              (feedContent.length === 0) ?
              <div className="empty-handler">
                <div className="empty-handler__img" />
                <h1 className="empty-handler__text">Публикаций пока нет</h1>
              </div> :
              feedContent.map((post) =>
                <Post
                  post={post} user={user}
                  handleClick={handleClick}
                  key={post.id}
                  openedPost={this.state.openedPost}
                  showFullPost={this.showFullPost}
                  showPreview={this.showPreview}
                  showPrevPost={this.showPrevPost}
                  showNextPost={this.showNextPost}
                  addComment={this.addComment}
                  deleteComment={this.deleteComment}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
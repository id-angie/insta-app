import React, { Component } from 'react';

import FeedState from './FeedState.js'
import Post from './post'
import tabs from '../../tabs.json';

import './index.scss';

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

  changeTab = (view) => {
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

  checkCurrentUser = (currentUser) => {
    if (!currentUser) {
      alert('Авторизуйтесь!');
      return;
    }
    return true;
  }

  render() {
    const feedContent = this.getFeedContent();
    return (
      <div className="feed">
        <div className="container">
          <div className="feed-flow">
            <FeedState
              tabs={tabs}
              view={this.state.view}
              changeTab={this.changeTab}
            />
            {
              (feedContent.length === 0) ?
              <div className="empty-handler">
                <div className="empty-handler__img" />
                <h1 className="empty-handler__text">Публикаций пока нет</h1>
              </div> :
              feedContent.map((post) =>
                <Post
                  post={post}
                  user={this.props.user}
                  toggleFollow={this.props.toggleFollow}
                  key={post.id}
                  openedPostId={this.state.openedPost && this.state.openedPost.id}
                  showFullPost={this.showFullPost}
                  showPreview={this.showPreview}
                  showPrevPost={this.showPrevPost}
                  showNextPost={this.showNextPost}
                  addComment={this.props.addComment}
                  deleteComment={this.props.deleteComment}
                  toggleLike={this.props.toggleLike}
                  toggleSave={this.props.toggleSave}
                  isFollow={this.props.isFollow}
                  currentUser={this.props.currentUser}
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedState from './FeedState.js'
import Post from './post'
import tabs from '../../tabs.json';
import { showPostsList } from '../../actions/user.js';

import './index.scss';

class Feed extends Component {
  state = {
    view: 'posts',
    openedPost: null
  };

  // getFeedContent = () => {
  //   return (
  //     this.state.view === 'posts' ?
  //     this.props.user.feed.posts :
  //     this.props.user.feed.tagged
  //   );
  // }

  componentDidMount() {
    this.props.showPostsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user._id !== this.props.user._id) {
      this.props.showPostsList();
    }
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
    const openThisPost = this.props.user.feed.find((post) => {
        return id === post._id;
      }
    );
    this.setState({
      openedPost: openThisPost
    });
  }

  showPrevPost = (e, id) => {
    const feed = this.props.user.feed;
    e.stopPropagation();
    const currentPost = feed.find((post) => (
      id === post._id
      )
    );
    const currentPostIndex = feed.indexOf(currentPost);
    this.setState({
      openedPost: feed[currentPostIndex - 1]
    });
  }

  showNextPost = (e, id) => {
    const feed = this.props.user.feed;
    e.stopPropagation();
    const currentPost = feed.find((post) => (
        id === post._id
      )
    );
    const currentPostIndex = feed.indexOf(currentPost);
    this.setState({
      openedPost: feed[currentPostIndex+ 1]
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
              (!this.props.user.feed || this.props.user.feed.length === 0) ?
              <div className="empty-handler">
                <div className="empty-handler__img" />
                <h1 className="empty-handler__text">Публикаций пока нет</h1>
              </div> :
              this.props.user.feed.map((post) =>
                <Post
                  post={post}
                  user={this.props.user}
                  toggleFollow={this.props.toggleFollow}
                  key={post._id}
                  openedPostId={this.state.openedPost && this.state.openedPost._id}
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

export default connect(
  (state) => ({
    user: state.user.user
  }),
  {
    showPostsList
  }
)(Feed);
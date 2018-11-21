import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';

import FeedState from './FeedState.js'
import Post from './post'
import tabs from '../../tabs.json';
import { showPostsList, showEmptyList } from '../../actions/user.js';

import './index.scss';

class Feed extends Component {
  state = {
    openedPost: null,
    isFetching: false
  };

  componentDidMount() {
    this.setState({
      isFetching: true
    });
    this.props.showPostsList()
      .then(() =>
        this.setState({
          isFetching: false
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user._id !== this.props.user._id) {
      this.setState({
        isFetching: true
      });
      this.props.showPostsList()
        .then(() =>
          this.setState({
            isFetching: false
          })
        );
    }
  }

  changeTab = (view) => {
    if (view === 'posts')
      this.props.showPostsList();
    else
      this.props.showEmptyList();
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
              view={this.props.view}
              changeTab={this.changeTab}
            />
            {
              (this.state.isFetching) ?
                <div className="react-spinner">
                  <MoonLoader
                    loading={this.state.isFetching}
                  />
                </div> :
                (!this.props.user.feed || this.props.user.feed.length === 0) ?
                <div className="empty-handler">
                  <div className="empty-handler__img" />
                  <h1 className="empty-handler__text">Публикаций пока нет</h1>
                </div> :
                this.props.user.feed.map((post) =>
                  <Post
                    postId={post._id}
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
  (state, props) => ({
    user: state.user.user,
    view: state.user.user.view || props.view
  }),
  {
    showPostsList,
    showEmptyList
  }
)(Feed);
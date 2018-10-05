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

  getPostsArray = () => {
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
    const postsArray = this.getPostsArray();
    const openThisPost = postsArray.find((post) => {
        return id === post.id;
      }
    );
    this.setState({
      openedPost: openThisPost
    });
  }

  showPrevPost = (e, id) => {
    const postsArray = this.getPostsArray();
    e.stopPropagation();
    const currentPost = postsArray.find((post) => {
        return id === post.id;
      }
    );
    const currentPostIndex = postsArray.indexOf(currentPost);
    this.setState({
      openedPost: postsArray[currentPostIndex - 1]
    });
  }

  showNextPost = (e, id) => {
    const postsArray = this.getPostsArray();
    e.stopPropagation();
    const currentPost = postsArray.find((post) => {
        return id === post.id;
      }
    );
    const currentPostIndex = postsArray.indexOf(currentPost);
    this.setState({
      openedPost: postsArray[currentPostIndex+ 1]
    });
  }

  render() {
    const { view } = this.state;
    const { user, handleClick } = this.props;
    const feedContent = view === 'posts' ? user.feed.posts : user.feed.tagged;
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
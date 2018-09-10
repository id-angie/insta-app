import React, { Component } from 'react';
import './index.css';
import FeedState from './FeedState.js'
import Post from './post'
import tabs from '../../tabs.json';

class Feed extends Component {
  state = {
    view: 'posts'
  };

  handleTab = (view) => {
    this.setState({
      view
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
                <Post post={post} user={user} handleClick={handleClick} key={post.id} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
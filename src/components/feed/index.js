import React, { Component } from 'react';
import './index.css';
import FeedState from './FeedState.js'

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
    return (
      <div className="feed">
        <div className="container">
          <div className="photo-flow">
            <FeedState
              tabs={[
                {
                  value: 'posts',
                  title: 'Публикации',
                  iconClass:'feed-state__img_view_posts'
                },
                {
                  value: 'tagged',
                  title: 'Отметки',
                  iconClass:'feed-state__img_view_tagged'
                }
              ]}
              view={this.state.view}
              onTab={this.handleTab}
            />
            <div className="photo mb40">
            </div>
            <div className="photo mb40">
            </div>
            <div className="photo mb40">
            </div>
            <div className="photo mb40">
            </div>
            <div className="photo mb40">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
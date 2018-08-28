import React, { Component } from 'react';
import './FeedState.css';

class FeedState extends Component {
  render() {
    const { tabs, view, onTab } = this.props;
    return (
      <div className="feed-state">
        {tabs.map((tab) =>
          <div
            className={`feed-state__tab ${
              tab.value === view && "feed-state__tab_active"
            }`}
            key={tab.value}
            onClick={() => onTab(tab.value)}
          >
            <div className={`feed-state__img ${tab.iconClass}`} />
            <span className="ml10">{tab.title}</span>
          </div>
        )}
      </div>
    );
  }
}

export default FeedState;
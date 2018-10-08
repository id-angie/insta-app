import React from 'react';
import cn from 'classnames';

import './FeedState.css';

const FeedState = ({
  tabs = [],
  view = 'posts',
  onTab,
  ...props
}) => (
  <div className="feed-state">
    {tabs.map((tab) =>
      <div
        className={
          cn("feed-state__tab", {
            "feed-state__tab_active": tab.value === view
          })
        }
        key={tab.value}
        onClick={() => onTab(tab.value)}
        {...props}
      >
        <div className={ cn("feed-state__img", tab.iconClass) } />
        <span className="ml10">{tab.title}</span>
      </div>
    )}
  </div>
);

export default FeedState;
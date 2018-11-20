import React from 'react';
import cn from 'classnames';

import './FeedState.scss';

const FeedState = ({
  tabs = [],
  view,
  changeTab,
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
        onClick={() => changeTab(tab.value)}
        {...props}
      >
        <div className={ cn("feed-state__img", tab.iconClass) } />
        <span>{tab.title}</span>
      </div>
    )}
  </div>
);

export default FeedState;
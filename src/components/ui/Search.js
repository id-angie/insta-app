import React, { Component } from 'react';
import cn from 'classnames';
import './Search.css';

class Search extends Component {
  state = {
    isFocused: false
  };
  render() {
    return (
      <div className={cn('search', {
        search_focused: this.state.isFocused
      })}>
        <input
          className="search__input"
          placeholder="Поиск"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
        />
        <div className="search__img" />
        <div className="search__close" />
      </div>
    );
  }
}

export default Search;
import React, { Component } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import users from '../../users.json';
import './Search.css';

const ClearIndicator  = ({ innerProps: { ...restInnerProps } }) => (
  <div
    {...restInnerProps}
    className="search__close"
  />
);

class Search extends Component {
  state = {
    isFocused: false,
    selectedOption: null
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  resetSearch = () => {
    this.setState({
      isFocused: false,
      selectedOption: null
    });
  }

  render() {
    const options = users.map((user) =>
      ({value: user.id, label: user.id})
    );

    const { selectedOption } = this.state;

    return (
      <div className={cn("search", {
            "search_focused": this.state.isFocused
          })}>
        <Select
          value={selectedOption}
          isClearable
          options={options}
          classNamePrefix="search__select"
          className="search__select"
          onChange={this.handleChange}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={this.resetSearch}
          placeholder="Поиск"
          components={{ClearIndicator}}
        />
      </div>
    );
  }
}

export default Search;
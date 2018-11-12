import React, { Component } from 'react';
import cn from 'classnames';
import Select from 'react-select';

import users from '../../users.json';

import './Search.scss';

const ClearIndicator  = ({ innerProps: { ...restInnerProps } }) => (
  <div
    {...restInnerProps}
    className="search__close"
  />
);

class Search extends Component {
  state = {
    isFocused: false,
    selectedOption: null,
    inputText: null
  };

  changeSelectedOption = (selectedOption) => {
    this.setState({ selectedOption });
  }

  resetSearch = () => {
    this.setState({
      isFocused: false,
      selectedOption: null,
      inputText: document.getElementById("react-select-2-input").value
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
          value={this.state.inputText || selectedOption}
          isClearable
          options={options}
          classNamePrefix="search__select"
          className="search__select"
          onChange={this.changeSelectedOption}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={this.resetSearch}
          placeholder={this.state.inputText || "Поиск"}
          components={{ClearIndicator}}
          noOptionsMessage={ () => "Не найдено" }
        />
      </div>
    );
  }
}

export default Search;
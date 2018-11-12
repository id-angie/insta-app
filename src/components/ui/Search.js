import React, { Component } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { withRouter } from 'react-router';

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
    inputText: null,
    options: []
  };

  changeSelectedOption = (selectedOption) => {
    this.props.history.push(`/user/${selectedOption.value}`);
  }

  resetSearch = () => {
    this.setState({
      isFocused: false,
      inputText: ''
    });
  }

  render() {
    const options = users.map((user) =>
      ({value: user.id, label: user.id})
    );

    const { selectedOption } = this.state;

  render() {
    return (
      <div className={cn("search", {
            "search_focused": this.state.isFocused
          })}>
        <Select
          value={this.state.inputText}
          isClearable
          options={this.state.options}
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

export default withRouter(Search);
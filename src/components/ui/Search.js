import React, { Component } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import users from '../../users.json';
import './Search.css';

class Search extends Component {
  state = {
    isFocused: false,
    selectedOption: null
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const options = users.map((user) =>
      ({value: user.id, label: user.id})
    );

    const { selectedOption } = this.state;

    const customStyles = {
      option: (base, state) => ({
        ...base,
        width: 150,
        height: 40,

      }),
      control: () => ({
        height: 30,
        width: 150,
        fontSize: 14,
        display: 'flex',
        justifyContent: 'space-beetween',
      }),
      singleValue: (base, state) => {
        const color = 'blue';
        return {...base, color}
      }
    }

    return (
      <div className={cn("search input-box", {
        "search_focused": this.state.isFocused
      })}>
    {/*    <input
          className="input search__input"
          placeholder="Поиск"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
        />
        <div className="search__img" />
        <div className="search__close" />
        */}
          <Select
            value={selectedOption}
            options={options}
            styles={customStyles}
            className="search__select"
            onChange={this.handleChange}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            placeholder="Поиск"
          />
      </div>
    );
  }
}

export default Search;
import React, { Component } from 'react';
import cn from 'classnames';

import CustomButton from '../ui/CustomButton.js';

import './index.scss';

class NewPost extends Component {

  state = {
    file: '',
    text: ''
  }

  handleEnter = (e) => {
    e.preventDefault();

    const {
      file,
      text
    } = this.state;

    if (!file)
      return;

    this.props.newPost(file, text);
  }

  handleFileInput = (value) => {
    let file = value;

    this.setState({
      file
    });
  }

  handleTextInput = (value) => {
    let text = value;

    this.setState({
      text
    });
  }

  render() {
    const {
      file,
      text
    } = this.state;

    const isFileValid = file !== '';

    return (
      <div className="new-post-container">
        <form className="new-post">
          <div className="new-post__logo" />
           <div className="input-box new-post__input-box">
            <input
              className="input new-post__input"
              value={file}
              placeholder="Загрузите файл"
              onChange={(e) => this.handleFileInput(e.target.value)}
            />
          </div>
          <div className="input-box new-post__input-box">
            <input
              className="input new-post__input"
              value={text}
              placeholder="Добавьте подпись..."
              onChange={(e) => this.handleTextInput(e.target.value)}
            />
          </div>
          <CustomButton
            className={ cn(
              "new-post__add-button", {
              "new-post__add-button_disactive": !isFileValid
              })
            }
            isActive={false}
            textDisactive="Опубликовать"
            onClick={this.handleEnter}
          />
        </form>
      </div>
    );
  }
}

export default NewPost;
import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomButton from '../ui/CustomButton.js';
import { newPost } from '../../actions/currentUser.js';

import './index.scss';

class NewPost extends Component {

  state = {
    file: '',
    preview: '',
    filename: '',
    comment: ''
  }

  handleEnter = (e) => {
    e.preventDefault();

    const {
      file,
      filename,
      comment
    } = this.state;

    if (!file)
      return;

    this.props.newPost(filename, comment);
  }

  clearFile = () => {
    this.setState({
      file: '',
      preview: '',
      filename: ''
    });
  }

  clearComment = () => {
    this.setState({
      comment: ''
    });
  }

  handleFileInput = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        filename: file.name,
        preview: reader.result
      });
    }
    if (!file) return;
    reader.readAsDataURL(file);
  }

  handleTextInput = (comment) => {
    this.setState({
      comment
    });
  }

  render() {
    const {
      file,
      preview,
      filename,
      comment
    } = this.state;

    const style = file ? {
      backgroundImage: `url(${preview})`,
      backgroundSize: "cover"
    } :
    {};

    return (
      <div className="new-post-container">
        <form className="new-post">
          <div className={ cn(
            "new-post__preview", {"new-post__preview_default": !file}
          )} style={style}
          >
          </div>
           <div className="input-box new-post__input-box">
            <label className={ cn(
              "input new-post__input new-post__input_file", {
              "new-post__input_large": !filename
            } )}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => this.handleFileInput(e)}
              />
              <span className={ cn(
                "input new-post__input new-post__input_filename", {
                "new-post__input_active-text": filename
                }) }
              >
                {filename ? filename : "Выберите файл"}
              </span>
            </label>
            <div
              className={ cn(
                "new-post__clear", {
                "new-post__clear_hidden": !file
              } )}
              onClick={this.clearFile}
            >
              ×
            </div>
          </div>
          <div className="input-box new-post__input-box">
            <input
              className={ cn(
                "input new-post__input", {
                "new-post__input_large": !comment
              } )}
              value={comment}
              placeholder="Добавьте подпись..."
              onChange={(e) => this.handleTextInput(e.target.value)}
            />
            <div
              className={ cn(
                "new-post__clear", {
                "new-post__clear_hidden": !comment
              } )}
              onClick={this.clearComment}
            >
              ×
            </div>
          </div>
          <CustomButton
            className={ cn(
              "new-post__add-button", {
              "new-post__add-button_disactive": !file
              })
            }
            isActive={false}
            textDisactive="Опубликовать"
            onClick={this.handleEnter}
          />
          <Link to="/" className="new-post__back-link">
            <CustomButton
              className="new-post__back-button"
              isActive={true}
              textActive="Назад"
            />
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    newPost
  }
)(NewPost);
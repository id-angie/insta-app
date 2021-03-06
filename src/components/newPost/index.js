import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomButton from '../ui/CustomButton.js';
import { newPost } from '../../actions/currentUser.js';
import prevent from '../../utils/prevent.js';

import './index.scss';

class NewPost extends Component {

  state = {
    file: null,
    preview: '',
    filename: '',
    comment: ''
  }

  handleEnter = () => {
    const {
      file,
      comment
    } = this.state;

    if (!file)
      return;

    this.props.newPost(file, comment);
    this.clearFile();
    this.clearComment();
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
                onChange={prevent(this.handleFileInput)}
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
            <textarea
              className={ cn(
                "input new-post__input", {
                "new-post__input_large": !comment
              } )}
              value={comment}
              maxLength="200"
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
            onClick={prevent(this.handleEnter)}
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
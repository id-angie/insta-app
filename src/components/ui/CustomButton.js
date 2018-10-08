import React, { Component } from 'react';
import cn from 'classnames';

import './CustomButton.css';

class CustomButton extends Component {
  render() {
    const {
      href,
      Tag = href ? 'a' : 'button',
      className,
      isActive,
      textActive,
      textDisactive,
      handleClick,
      ...props
    } = this.props;

    return (
      <Tag
        className={ cn(className, "custom-button", {
          "custom-button_active": isActive
        })}
        href={href}
        onClick={handleClick}
        {...props}
      >
        { isActive ? textActive : textDisactive }
      </Tag>);
  }
}

export default CustomButton;
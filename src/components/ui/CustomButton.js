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
      onClick,
      ...props
    } = this.props;

    return (
      <Tag
        className={ cn(className, "custom-button", {
          "custom-button_active": isActive
        })}
        href={href}
        onClick={onClick}
        {...props}
      >
        { isActive ? textActive : textDisactive }
      </Tag>);
  }
}

export default CustomButton;
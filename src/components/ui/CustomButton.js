import React from 'react';
import './CustomButton.css';

const CustomButton = ({
  href,
  Tag = href ? 'a' : 'button',
  className = '',
  isActive = false,
  ...props
}) => (
  <Tag
    className={`${className} custom-button ${isActive ? "custom-button_active" : ""}`}
    href={href}
    {...props}
  />
);

export default CustomButton;
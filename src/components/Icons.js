import React from 'react';

const IconStyle = {
  display: 'block',
  color: 'rgba(0, 0, 0, 0.87)',
  fill: 'rgb(117, 117, 117)',
  height: '24px',
  width: '24px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  position: 'absolute',
  top: '0px',
  margin: '12px',
  left: '4px',
  userSelect: 'none'
}

const mergeStyle = (src, target) => {
  return Object.assign({}, src, target);
};

class GreetingIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 24 24" style={IconStyle}>
        <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
      </svg>
    );
  }
}

class UsersIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 24 24" style={IconStyle}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    );
  }
}

class NotificationIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 24 24" style={IconStyle}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
    );
  }
}

class AvatarIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 24 24" style={mergeStyle(IconStyle, {top: '12px', left: '12px'})}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    );
  }
}

class ContentAddIcon extends React.PureComponent {
  render() {
    return (
      <svg viewBox="0 0 24 24" style={mergeStyle(IconStyle, {top: '4px'})}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    );
  }
}

export {
  GreetingIcon,
  UsersIcon,
  NotificationIcon,
  AvatarIcon,
  ContentAddIcon
}

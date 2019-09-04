import React from 'react';
import classnames from 'classnames';

function FileIcon({ className, type }) {
  console.log(className, type)
  return <i className={classnames('zivicon', `icon-${type}`, className)}></i>
}

export default FileIcon;
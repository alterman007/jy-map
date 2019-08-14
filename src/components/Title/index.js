import React from 'react';
import FontIcon from '../FontIcon';
import './index.styl';

function Title({ name, onClose }) {
  return (
    <h4 className="title-wrapper">
      {name}
      <button onClick={onClose}>
        <FontIcon type="close" className="close-btn" />
      </button>
    </h4>
  );
}

export default Title;
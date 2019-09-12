import React from 'react';
import FontIcon from '../FontIcon';
import bgImg from './bg.png';
import './index.styl';

function Title({ name, onClose }) {
  return (
    <h4 className="title-wrapper">
      <span>
        {name}
        <img src={bgImg} alt=""/>
      </span>
      <button onClick={onClose}>
        <FontIcon type="close" className="close-btn" />
      </button>
    </h4>
  );
}

export default Title;

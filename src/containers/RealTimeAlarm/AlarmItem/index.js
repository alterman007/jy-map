import React from 'react';
import demoImg from './demo.png';

import './index.styl';

function AlarmItem({ type, name, time }) {
  return (
    <li className="real-time-alarm-item">
      <img src={demoImg} alt=""/>
      <div className="alarm-desc">
        <div className="type-name">
          <span>{type}</span>
          <span>{name}</span>
        </div>
        <div className="time">
          告警时间：{time}
        </div>
      </div>
    </li>
  );
}

export default AlarmItem;
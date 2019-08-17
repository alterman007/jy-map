import React from 'react';
import demoImg from './demo.png';

import './index.styl';

function AlarmItem(item) {
  const { onClick } = item;
  let type, name, time;
  if (item.alarmId) {
    type = '人脸告警';
    name = item.humanName;
    time = item.alarmTime;
  } else {
    type = '车辆告警';
    name = item.plateinfo;
    time = new Date(+item.passtime).toLocaleString('zh', { hour12: false });
  }
  return (
    <li className="real-time-alarm-item" onClick={onClick}>
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

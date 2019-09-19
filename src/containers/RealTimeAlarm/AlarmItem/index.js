import React from 'react';
import demoImg from './demo.png';
import { setIshowHDPICModal } from '../../../actions/cpmStatus';
import './index.styl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageLazyLoad from '../../../components/ImageLazyLoad';
import { getAlarmType, alarmType } from '../../../constants/alarmConstants';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowHDPICModal
    },dispatch)
  }
}

function AlarmItem(props) {
  const { onClick, type, name, alarmTime, baseImage, address, hdpicImage } = props;
  console.log("props", props)
  const imgClick = () => {
    props.actions.setIshowHDPICModal({
      hdpic: hdpicImage,
      ishow: true,
      name,
      time: alarmTime,
      address,
      type,
    })
  }
  return (
    <li className="real-time-alarm-item" onClick={onClick}>
      <ImageLazyLoad imgsrc={baseImage} imgClick={imgClick}/>
      <div className="alarm-desc">
        <div className="type-name">
          <span className="name">{getAlarmType(type)}: {name}</span>
          <span>地址: {address}</span>
          <span className="alarm-type">告警类型:{alarmType[type]}</span>
        </div>
        <div className="time">
          告警时间：{alarmTime}
        </div>
      </div>
    </li>
  );
}

export default connect(null,mapDispatchToProps)(AlarmItem);

import React from 'react';
import demoImg from './demo.png';
import { setIshowHDPICModal } from '../../../actions/cpmStatus';
import './index.styl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageLazyLoad from '../../../components/ImageLazyLoad';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowHDPICModal
    },dispatch)
  }
}

function AlarmItem(item) {
  const { onClick } = item;
  let type, name, time, imgsrc, address, hdpic;

  if (item.alarmId) {
    type = '人脸告警';
    address = item.cameraName
    name = item.humanName;
    time = item.alarmTime;
    imgsrc = item.facePicUrl
    hdpic = item.bkgPicUrl
  } else {
    type = '车辆告警';
    name = item.plateInfo;
    // time = new Date(+item.passtime).toLocaleString('zh', { hour12: false });
    time = item.passTimeStr
    imgsrc = item.picPlate
    address = item.crossingName
    hdpic = item.picVehicle
  }
  // imgsrc="http://img4.imgtn.bdimg.com/it/u=3565682627,2876030475&fm=26&gp=0.jpg"
  const imgClick = () => {
    item.actions.setIshowHDPICModal({
      hdpic,
      ishow: true,
      name,
      time,
      address,
      type
    })
  }
  return (
    <li className="real-time-alarm-item" onClick={onClick}>
      <ImageLazyLoad imgsrc={imgsrc} imgClick={imgClick}/>
      {/* <img src={imgsrc} alt="" onClick={imgClick.bind(this,hdpic, name, time, address, type)}/> */}
      <div className="alarm-desc">
        <div className="type-name">
          {/* <span>{type}</span> */}
          <span className="name">{item.alarmId ? '姓名' : '车辆'}: {name}</span>
          <span>地址: {address}</span>
        </div>
        <div className="time">
          告警时间：{time}
        </div>
      </div>
    </li>
  );
}

export default connect(null,mapDispatchToProps)(AlarmItem);

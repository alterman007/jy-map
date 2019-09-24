import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowHDPICModal } from '../../actions/cpmStatus';
import { getAlarmType, AlarmInfo } from '@/constants/alarmConstants';
import moment from 'moment'
import './index.styl';
const mapStateToProps = (state) => {
  return {
    isShowHDPICModal: state.cmpStatus.isShowHDPICModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowHDPICModal
    }, dispatch)
  }
}

const renderFaceByFixedMonitor = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`抓拍人员: ${detail.humanName}`}</p>
      <p>人员性别：{AlarmInfo.faceByFixedMonitor.sex[detail.sex]}</p>
      <p>年龄段：{AlarmInfo.faceByFixedMonitor.ageInfo[detail.age]}</p>
      <p>是否戴眼镜：{AlarmInfo.faceByFixedMonitor.glassInfo[detail.glass]}</p>
      <p>是否微笑：{AlarmInfo.faceByFixedMonitor.smileStatus[detail.smile]}</p>
      <p>告警时间：{detail.alarmTime}</p>
      <p>抓拍地址：{detail.cameraName}</p>
      <p>设备编号：{detail.indexCode}</p>
    </div>
  )
}

const renderCarByFixedMonitor = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`抓拍车辆: ${detail.plateInfo}`}</p>
      <p>违法行为：{AlarmInfo.carByFixedMonitor.alarmAction[detail.alarmAction]}</p>
      <p>车牌颜色：{AlarmInfo.carByFixedMonitor.platecolor[detail.plateColor]}</p>
      <p>车牌类型：{AlarmInfo.carByFixedMonitor.platetype[detail.plateType]}</p>
      <p>车辆速度：{detail.vehicleSpeed}</p>
      <p>告警时间：{detail.passTimeStr}</p>
      <p>抓拍地址：{detail.crossingName}</p>
      <p>设备编号：{detail.indexCode}</p>
    </div>
  )
}

const renderFaceByCarMonitor = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
       <p>{`抓拍人员: ${detail.humanName}`}</p>
      <p>人员性别：{AlarmInfo.faceByFixedMonitor.sex[detail.sex]}</p>
      <p>年龄段：{AlarmInfo.faceByFixedMonitor.ageInfo[detail.age]}</p>
      <p>是否戴眼镜：{AlarmInfo.faceByFixedMonitor.glassInfo[detail.glass]}</p>
      <p>是否微笑：{AlarmInfo.faceByFixedMonitor.smileStatus[detail.smile]}</p>
      <p>告警时间：{detail.alarmTime}</p>
      <p>抓拍地址：{detail.cameraName}</p>
      <p>设备编号：{detail.indexCode}</p>
    </div>
  )
}

const renderCarByCarMonitor = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`比对车牌号: ${detail.cph}`}</p>
      <p>抓拍缘由：{detail.bdjg}</p>
      <p>登记人：{detail.syr}</p>
      <p>登记人证件号码：{detail.sfzmhm}</p>
      <p>登记时间：{moment(detail.ccdjrq,'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}</p>
      <p>告警时间：{detail.createDate}</p>
      <p>抓拍位置：{detail.cameraName}</p>
    </div>
  )
}

const renderFaceImgByCar = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
      <p>所属派出所：{detail.sspcs}</p>
      <p>警车牌号：{detail.vehicleIdentification}</p>
      <p>警员编号：{detail.policeid}</p>
      <p>抓拍位置：{detail.cameraName}</p>
      <p>抓拍时间：{detail.createTime}</p>
      <p>设备编号：{detail.indexCode}</p>
    </div>
  )
}

const renderCarImgByCar = (detail = {}) => {
  return (
    <div className="hdpic-alarm-info">
      <p>所属派出所：{detail.sspcs}</p>
      <p>抓拍车辆：{detail.carNumber}</p>
      <p>警车牌号：{detail.vehicleIdentification}</p>
      <p>抓拍位置：{detail.cameraName}</p>
      <p>抓拍时间：{detail.createTime}</p>
      <p>设备编号：{detail.indexCode}</p>
    </div>
  )
}

const HDPICModal = ({ isShowHDPICModal, actions }) => {
  const { ishow, hdpic, name, time, address, type, real, detailInfo } = isShowHDPICModal;
  const onCancel = () => {
    actions.setIshowHDPICModal({})
  }
  const renderContent = () => {
    switch (type) {
      case 1:
        return renderFaceByFixedMonitor(detailInfo);
      case 2:
        return renderCarByFixedMonitor(detailInfo);
      case 0:
        return renderFaceByCarMonitor(detailInfo);
      case 3:
        return renderCarByCarMonitor(detailInfo);
      case 4: 
        return renderFaceImgByCar(detailInfo)
      case 5:
        return renderCarImgByCar(detailInfo)
      default:
        return '加载出现了点儿问题，联系管理员';
    }
  }
  console.log("HDPICModal", isShowHDPICModal)
  return (
    <Modal
      visible={ishow}
      title={address}
      width="60%"
      // height={800}
      footer={null}
      onCancel={onCancel}
      className="corner-border resetModalStye"
    >
      {
        renderContent()
      }
      <img
        src={hdpic}
        style={{ width: '100%' }}
      />
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HDPICModal);
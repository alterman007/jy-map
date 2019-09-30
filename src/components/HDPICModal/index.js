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

const renderFaceByFixedMonitor = (detail = {}, hdpic) => {
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
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              height:
                '500px'
            }}
          />
        </div>
        <div className="hdpic-alarm-info-img-dbt">
          <h3>比对图：</h3>
          <img style={{
            height: '500px'
          }} src={detail.humans[0] && detail.humans[0].facePicUrl} />
        </div>
      </div>
    </div>
  )
}

const renderCarByFixedMonitor = (detail = {}, hdpic) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`抓拍车辆: ${detail.plateInfo}`}</p>
      <p>违法行为：{AlarmInfo.carByFixedMonitor.alarmAction[detail.alarmAction]}</p>
      <p>车牌颜色：{AlarmInfo.carByFixedMonitor.platecolor[detail.plateColor]}</p>
      <p>车牌类型：{AlarmInfo.carByFixedMonitor.platetype[detail.plateType]}</p>
      <p>车辆速度：{detail.vehicleSpeed}</p>
      <p>告警时间：{detail.passTimeStr}</p>
      <p>抓拍地址：{detail.crossingName}</p>
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              width: '100%',
              height:
                '500px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

const renderFaceByCarMonitor = (detail = {}, hdpic) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`抓拍人员: ${detail.humanName}`}</p>
      <p>人员性别：{AlarmInfo.faceByFixedMonitor.sex[detail.sex]}</p>
      <p>年龄段：{AlarmInfo.faceByFixedMonitor.ageInfo[detail.age]}</p>
      <p>是否戴眼镜：{AlarmInfo.faceByFixedMonitor.glassInfo[detail.glass]}</p>
      <p>是否微笑：{AlarmInfo.faceByFixedMonitor.smileStatus[detail.smile]}</p>
      <p>告警时间：{detail.alarmTime}</p>
      <p>比对库名称：{detail.humans[0] && detail.humans[0].listLibName}</p>
      <p>抓拍地址：{detail.cameraName}</p>
      <p>设备编号：{detail.indexCode}</p>
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              height:
                '500px'
            }}
          />
        </div>
        <div className="hdpic-alarm-info-img-dbt">
          <h3>比对图：</h3>
          <img style={{
            height: '500px'
          }} src={detail.humans[0] && detail.humans[0].facePicUrl} />
        </div>
      </div>
    </div>
  )
}

const renderCarByCarMonitor = (detail = {}, hdpic) => {
  return (
    <div className="hdpic-alarm-info">
      <p>{`比对车牌号: ${detail.cph}`}</p>
      <p>抓拍缘由：{detail.bdjg}</p>
      <p>登记人：{detail.syr}</p>
      <p>登记人证件号码：{detail.sfzmhm}</p>
      <p>登记时间：{moment(detail.ccdjrq, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}</p>
      <p>告警时间：{detail.createDate}</p>
      <p>抓拍位置：{detail.cameraName}</p>
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              height:
                '500px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

const renderFaceImgByCar = (detail = {}, hdpic) => {
  return (
    <div className="hdpic-alarm-info">
      <p>所属派出所：{detail.sspcs}</p>
      <p>警车牌号：{detail.vehicleIdentification}</p>
      <p>警员编号：{detail.policeid}</p>
      <p>抓拍位置：{detail.cameraName}</p>
      <p>抓拍时间：{detail.createTime}</p>
      <p>设备编号：{detail.indexCode}</p>
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              height:
                '500px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

const renderCarImgByCar = (detail = {}, hdpic) => {
  return (
    <div className="hdpic-alarm-info">
      <p>所属派出所：{detail.sspcs}</p>
      <p>抓拍车辆：{detail.carNumber}</p>
      <p>警车牌号：{detail.vehicleIdentification}</p>
      <p>抓拍位置：{detail.cameraName}</p>
      <p>抓拍时间：{detail.createTime}</p>
      <p>设备编号：{detail.indexCode}</p>
      <div className="hdpic-alarm-info-img">
        <div className="hdpic-alarm-info-img-zpt">
          <h3>抓拍图：</h3>
          <img
            src={hdpic}
            style={{
              width: '100%',
              height:
                '500px'
            }}
          />
        </div>
      </div>
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
        return renderFaceByFixedMonitor(detailInfo, hdpic);
      case 2:
        return renderCarByFixedMonitor(detailInfo, hdpic);
      case 0:
        return renderFaceByCarMonitor(detailInfo, hdpic);
      case 3:
        return renderCarByCarMonitor(detailInfo, hdpic);
      case 4:
        return renderFaceImgByCar(detailInfo, hdpic)
      case 5:
        return renderCarImgByCar(detailInfo, hdpic)
      default:
        return '加载出现了点儿问题，联系管理员';
    }
  }
  console.log("HDPICModal", isShowHDPICModal)
  return (
    <Modal
      visible={ishow}
      title={address}
      width="80%"
      // height={800}
      footer={null}
      onCancel={onCancel}
      className="corner-border resetModalStye"
    >
      {
        renderContent()
      }
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HDPICModal);
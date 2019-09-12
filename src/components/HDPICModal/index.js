import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowHDPICModal } from '../../actions/cpmStatus';
import { alarmType } from '@/constants/alarmConstants';
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

const imgType = {
  '人脸告警': '姓名',
  '车辆告警': '车牌',
  '车辆抓拍': '抓拍位置',
  '卡口-人脸告警': '姓名',
  '卡口-车辆告警': '车牌',
  '车载-车辆告警': '车牌',
  '车载-人脸告警': '姓名'
}

const HDPICModal = ({ isShowHDPICModal, actions }) => {
  const { ishow, hdpic, name, time, address, type } = isShowHDPICModal;
  const onCancel = () => {
    actions.setIshowHDPICModal({})
  }
  console.log(isShowHDPICModal)
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
      <div>
        <p>{`${imgType[alarmType[type]]}: ${name}`}</p>
        <p>时间：{time}</p>
        <p>{type === 4 ? '所属派出所' : '地点'}：{address}</p>
      </div>
      <img
        src={hdpic}
        style={{ width: '100%' }}
      />
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HDPICModal);
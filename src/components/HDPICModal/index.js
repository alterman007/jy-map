import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowHDPICModal } from '../../actions/cpmStatus';
import { getAlarmType } from '@/constants/alarmConstants';
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

const HDPICModal = ({ isShowHDPICModal, actions }) => {
  const { ishow, hdpic, name, time, address, type, real } = isShowHDPICModal;
  const onCancel = () => {
    actions.setIshowHDPICModal({})
  }
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
        <p>{`${getAlarmType(type)}: ${name? name: '未知'}`}</p>
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
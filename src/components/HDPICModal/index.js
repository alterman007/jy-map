import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowHDPICModal } from '../../actions/cpmStatus';
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

const HDPICModal = ({isShowHDPICModal, actions}) => {
    const {ishow, hdpic, name, time, address, type} = isShowHDPICModal;
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
                <p>{`${type === '人脸告警' ? '姓名':'车牌'}: ${name}`}</p>
                <p>时间：{time}</p>
                <p>地点：{address}</p>
            </div>
            <img 
            src={hdpic}
            style={{width: '100%'}}
            />
        </Modal>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(HDPICModal);
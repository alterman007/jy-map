import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowPCSPoliceModal } from '../../actions/cpmStatus';

const mapStateToProps = (state) => {
  return {
    iShowPCSPoliceCallModal: state.cmpStatus.iShowPCSPoliceCallModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowPCSPoliceModal
    }, dispatch)
  }
}

const PCSPoliceCall = ({ iShowPCSPoliceCallModal, actions }) => {
  
  useEffect(() => {
    iShowPCSPoliceCallModal.iShow && console.log("变化了")
  }, [iShowPCSPoliceCallModal])

  return (
    <Modal
      visible={iShowPCSPoliceCallModal.iShow}
      title="分局警情统计"
      className="corner-border resetModalStye"
      onCancel={() => actions.setIshowPCSPoliceModal({iShow: false})}
      footer={null}
      width={1000}
      mask={false}
      zIndex={0}
    >
      <div>
        hehe
      </div>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PCSPoliceCall)
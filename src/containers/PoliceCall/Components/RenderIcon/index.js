import React from 'react';
import { connect } from 'react-redux';
import icon from './icon2.png';
import alarm from './alarm.png';
const mapStateToProps = (state) => {
    return {
      isAlarmComing: state.cmpStatus.isAlarmComing
    }
  }

const RenderIcon = ({togglePoliceVisible, isAlarmComing}) => {
    return (
        <>
            <img onClick={togglePoliceVisible} className={"police-call-icon police-alarm-status " + isAlarmComing} src={alarm} alt="110" />;
            <img onClick={togglePoliceVisible} className="police-call-icon " src={icon} alt="110" />;
        </>
    )
}

export default connect(mapStateToProps)(RenderIcon)
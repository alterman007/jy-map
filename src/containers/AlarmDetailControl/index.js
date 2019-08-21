import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlarmDetail from '../AlarmDetail';

const mapStateToProps = (state) => ({
  alarmDetail: state.map.showAlarmHistoryDetail,
  alarmMarker: state.map.alarmMarker,
});

class AlarmDetailControl extends Component {
  render() {
    const { alarmDetail, alarmMarker } = this.props;
    // console.log(alarmDetail === alarmMarker);
    if (alarmDetail && alarmDetail === alarmMarker) {
      return <AlarmDetail detail={alarmDetail} />
    }
    return null;
  }
}

export default connect(mapStateToProps)(AlarmDetailControl);

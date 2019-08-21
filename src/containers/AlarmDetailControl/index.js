import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlarmDetail from '../AlarmDetail';

const mapStateToProps = (state) => ({
  detailId: state.alarmHistory.detailId,
});

class AlarmDetailControl extends Component {
  render() {
    const { detailId } = this.props;
    if (detailId) {
      return <AlarmDetail key={detailId} detailId={detailId} />
    }
    return null;
  }
}

export default connect(mapStateToProps)(AlarmDetailControl);

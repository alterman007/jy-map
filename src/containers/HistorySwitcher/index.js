import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleAlarmHistoryVisible } from '../../actions/alarmHistory';
import { toggleForceHistoryVisible } from '../../actions/forceHistory';

import './index.styl';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  forceHistoryVisible: state.forceHistory.visible,
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleAlarmHistoryVisible,
    toggleForceHistoryVisible,
  }, dispatch),
});

class HistorySwitcher extends Component {
  handleForceClick = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible();
    actions.toggleAlarmHistoryVisible(false);
  }

  handleAlarmClick = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible(false);
    actions.toggleAlarmHistoryVisible();
  }

  render() {
    const { forceHistoryVisible, alarmHistoryVisible } = this.props;
    return (
      <div className="history-switcher-wrapper">
        <button className={classnames({ active: forceHistoryVisible })} onClick={this.handleForceClick}>联网警力</button>
        <button className={classnames({ active: alarmHistoryVisible })} onClick={this.handleAlarmClick}>联网告警</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(HistorySwitcher);

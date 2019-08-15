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
        <svg width="252px" height="55px" onClick={this.handleForceClick} className={classnames('btn', { active: forceHistoryVisible })}>
          <path fill="#20AAFF" stroke="#20AAFF" strokeWidth="2" transform="translate(0, -159)" fillOpacity="0.5" d="M249.769001,160 L60.3889837,160 L2.57080187,213 L215.720517,213 L249.769001,160 Z"></path>
          <text transform="translate(80, 38)">联网警力</text>
        </svg>
        <svg style={{ margin: '0 -15px' }} width="140px" height="109px">
          <g stroke="none" strokeWidth="1" fill="none">
            <path d="M70,1.85059284 L1.83065596,108 L138.169344,108 L70,1.85059284 Z" stroke="#20AAFF" strokeWidth="2" fillOpacity="0.5" fill="#20AAFF"></path>
            <path d="M70,18.8580835 L18.8250413,99 L121.174959,99 L70,18.8580835 Z" stroke="#20AAFF" strokeWidth="2"></path>
            <path d="M70.6435398,91 C68.4344008,91 66.6435398,89.209139 66.6435398,87 C66.6435398,84.790861 68.4344008,83 70.6435398,83 C72.8526788,83 74.6435398,84.790861 74.6435398,87 C74.6435398,89.209139 72.8526788,91 70.6435398,91 Z M70.6435398,43 C73.2079792,43 75.2868681,45.0788889 75.2868681,47.6433283 C75.2868681,47.7577824 75.2826363,47.8721974 75.2741814,47.9863388 L73.1492404,76.6730419 C73.0520515,77.9850917 71.9591843,79 70.6435398,79 C69.3278954,79 68.2350281,77.9850917 68.1378392,76.6730419 L66.0128982,47.9863388 C65.8234588,45.428906 67.7430966,43.2021262 70.3005293,43.0126867 C70.4146707,43.0042318 70.5290857,43 70.6435398,43 Z" fill="#FFFFFF"></path>
          </g>
        </svg>
        <svg width="245px" height="55px" onClick={this.handleAlarmClick} className={classnames('btn', { active: alarmHistoryVisible })}>
          <path fill="#20AAFF" stroke="#20AAFF" strokeWidth="2" transform="translate(-372, -54)" fillOpacity="0.5" d="M374.230999,55 L408.279483,108 L614.429198,108 L556.611016,55 L374.230999,55 Z"></path>
          <text transform="translate(55, 38)">联网告警</text>
        </svg>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(HistorySwitcher);

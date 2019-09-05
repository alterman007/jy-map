import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleAlarmHistoryVisible } from '../../actions/alarmHistory';
import { toggleForceHistoryVisible } from '../../actions/forceHistory';
import { setIshowRadioMarkers, setIshowCarMarkers, setIshowHeatLayers, setIshowMonitorMarkers } from '../../actions/cpmStatus';

import './index.styl';
import { message } from 'antd';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  forceHistoryVisible: state.forceHistory.visible,
  iShowRadioMarkers: state.map.iShowRadioMarkers,
  iShowCarMarkers: state.map.iShowCarMarkers,
  iShowHeatLayers: state.map.iShowHeatLayers,
  iShowMonitorMarkers: state.map.iShowMonitorMarkers
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleAlarmHistoryVisible,
    toggleForceHistoryVisible,
    setIshowRadioMarkers,
    setIshowCarMarkers,
    setIshowHeatLayers,
    setIshowMonitorMarkers
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

  handleRadioClick = () => {
    this.props.actions.setIshowRadioMarkers()
  }

  handleRealCarClick = () => {
    this.props.actions.setIshowCarMarkers()
  }

  handleMonitorClick = () => {
    this.props.actions.setIshowMonitorMarkers()
  }

  handleHeatClick = () => {
    return message.warning("建设中...", 0);
    this.props.actions.setIshowHeatLayers() 
  }
  render() {
    const { forceHistoryVisible, alarmHistoryVisible, iShowRadioMarkers, iShowCarMarkers, iShowHeatLayers, iShowMonitorMarkers } = this.props;
    return (
      <div className="history-switcher-wrapper">
        <svg width="245px" height="55px" onClick={this.handleMonitorClick} className={classnames('btn', { active: iShowMonitorMarkers })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-5, -159)" fillOpacity="1" d="M249.769001,160 L60.3889837,160 L2.57080187,213 L215.720517,213 L249.769001,160 Z"></path>
          <text transform="translate(75, 38)">监控探头</text>
        </svg>
        
        <svg width="245px" height="55px" onClick={this.handleRealCarClick} className={classnames('btn', { active: iShowCarMarkers })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-5, -159)" fillOpacity="1" d="M249.769001,160 L60.3889837,160 L2.57080187,213 L215.720517,213 L249.769001,160 Z"></path>
          <text transform="translate(75, 38)">实时车辆</text>
        </svg>
        <svg width="252px" height="55px" onClick={this.handleForceClick} className={classnames('btn', { active: forceHistoryVisible })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(0, -159)" fillOpacity="1" d="M249.769001,160 L60.3889837,160 L2.57080187,213 L215.720517,213 L249.769001,160 Z"></path>
          <text transform="translate(80, 38)">联网警力</text>
        </svg>
        <svg style={{ margin: '0 -15px' }} width="140px" height="109px">
          <g stroke="none" strokeWidth="1" fill="none">
            <path d="M70,1.85059284 L1.83065596,108 L138.169344,108 L70,1.85059284 Z" stroke="#68E0FB" strokeWidth="2" fillOpacity="1" fill="#68E0FB"></path>
            <path d="M70,18.8580835 L18.8250413,99 L121.174959,99 L70,18.8580835 Z" stroke="#020607" strokeWidth="2"></path>
            <path d="M70.6435398,91 C68.4344008,91 66.6435398,89.209139 66.6435398,87 C66.6435398,84.790861 68.4344008,83 70.6435398,83 C72.8526788,83 74.6435398,84.790861 74.6435398,87 C74.6435398,89.209139 72.8526788,91 70.6435398,91 Z M70.6435398,43 C73.2079792,43 75.2868681,45.0788889 75.2868681,47.6433283 C75.2868681,47.7577824 75.2826363,47.8721974 75.2741814,47.9863388 L73.1492404,76.6730419 C73.0520515,77.9850917 71.9591843,79 70.6435398,79 C69.3278954,79 68.2350281,77.9850917 68.1378392,76.6730419 L66.0128982,47.9863388 C65.8234588,45.428906 67.7430966,43.2021262 70.3005293,43.0126867 C70.4146707,43.0042318 70.5290857,43 70.6435398,43 Z" fill="#020607"></path>
          </g>
        </svg>
        <svg width="245px" height="55px" onClick={this.handleAlarmClick} className={classnames('btn', { active: alarmHistoryVisible })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-372, -54)" fillOpacity="1" d="M374.230999,55 L408.279483,108 L614.429198,108 L556.611016,55 L374.230999,55 Z"></path>
          <text transform="translate(55, 38)">联网告警</text>
        </svg>
        <svg width="245px" height="55px"  onClick={this.handleRadioClick} className={classnames('btn', { active: iShowRadioMarkers })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-372, -54)" fillOpacity="1" d="M374.230999,55 L408.279483,108 L614.429198,108 L556.611016,55 L374.230999,55 Z"></path>
          <text transform="translate(55, 38)">实时电台</text>
        </svg>
        {/* <svg width="245px" height="55px" onClick={this.handleMonitorClick} className={classnames('btn', { active: alarmHistoryVisible })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-372, -54)" fillOpacity="1" d="M374.230999,55 L408.279483,108 L614.429198,108 L556.611016,55 L374.230999,55 Z"></path>
          <text transform="translate(55, 38)">监控点位</text>
        </svg> */}
        <svg width="245px" height="55px" onClick={this.handleHeatClick} className={classnames('btn', { active: false || -iShowHeatLayers })}>
          <path fill="#68E0FB" stroke="#68E0FB" strokeWidth="2" transform="translate(-372, -54)" fillOpacity="1" d="M374.230999,55 L408.279483,108 L614.429198,108 L556.611016,55 L374.230999,55 Z"></path>
          <text transform="translate(55, 38)">热力图</text>
        </svg>
      </div>
    );
  }
}

//fill 20AAFF
// fillOpacity 0.5

export default connect(mapStateToProps, mapDispatchProps)(HistorySwitcher);

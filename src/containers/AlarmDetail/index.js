import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import {
  fetchForcePath,
} from '../../actions/forceHistory';
import {
  selectAlarmItem,
} from '../../actions/alarmHistory';
import {
  setMapPath,
  setAlarmHistoryDetail,
} from '../../actions/map';
// import { getAlarmDetailById } from '../../request/api';
import demoImg from './demo.png';
import './index.styl';

// const mapStateToProps = (state) => ({
//   detailId: state.forceHistory.detailId,
// });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
    setMapPath,
    setAlarmHistoryDetail,
    selectAlarmItem,
  }, dispatch),
});

class AlarmDetail extends Component {
  pickerStyle = {
    width: '100%',
    background: '#A5303055',
  };

  state = {
    showTimeSearch: false,
    fromTime: null,
    toTime: null,
  };

  showPath = () => {
    this.setState({
      showTimeSearch: true,
    });
  }

  close = () => {
    const { actions } = this.props;
    actions.setMapPath(null);
    actions.selectAlarmItem(null);
    actions.setAlarmHistoryDetail(null);
  }

  onSearchPath = () => {
    const { detail, actions } = this.props;
    const { fromTime, toTime } = this.state;
    actions.fetchForcePath({
      humanId: detail.humanId,
      biggintime: fromTime,
      endtime: toTime,
      moveFlag: false,
    });
  }

  onTimeChange(type, undef, date) {
    this.setState({ [type]: date });
  }

  renderAction() {
    const { detail } = this.props;
    const { showTimeSearch } = this.state;
    if (showTimeSearch) {
      return this.renderTimeSearch();
    }
    return (
      <div className="action-detail-wrapper">
        {
          detail.type === 'face' && <button onClick={this.showPath}>人脸轨迹</button>
        }
        <button onClick={this.close}>关闭</button>
      </div>
    );
  }

  renderTimeSearch() {
    return (
      <div className="timer-range-search">
        <DatePicker
          className="data-picker"
          showTime
          placeholder="开始时间"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'fromTime')}
          style={this.pickerStyle}
          size="large"
        />
        <DatePicker
          className="data-picker"
          showTime
          placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'toTime')}
          style={this.pickerStyle}
          size="large"
        />
        <div className="action-detail-wrapper">
          <button onClick={this.onSearchPath}>查&nbsp;&nbsp;&nbsp;&nbsp;询</button>
          <button onClick={this.close}>完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
        </div>
      </div>
    );
  }

  render() {
    const { detail } = this.props;
    if (!detail) {
      return null;
    }
    return (
      <div className="alarm-detail-wrapper corner-border-warning">
        <img src={demoImg} alt="背景图片" />
        <div className="h6-name">{detail.humanName || detail.plateInfo}</div>
        {
          detail.type === 'face' && <div className="info">
            身份证：{detail.humans && detail.humans[0] && detail.humans[0].credentialsNum}
          </div>
        }
        <div className="info">
          经 度：{detail.longitude.toString().substr(0, 10)}
        </div>
        <div className="info">
          纬 度：{detail.latitude.toString().substr(0, 10)}
        </div>
        <div className="info">
          告警日期：{detail.alarmTime || detail.passTimeStr}
        </div>
        <div className="info">
          告警类别：<span className="warning">{detail.type === 'face' ? '人脸告警' : '车辆告警'}</span>
        </div>
        <div className="info">
          设备号：{detail.indexCode}
        </div>
        <div className="info">
          所在区域：{detail.crossingName}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AlarmDetail);

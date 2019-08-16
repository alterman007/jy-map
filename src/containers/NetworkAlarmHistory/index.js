import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import {
  toggleAlarmHistoryVisible,
  fetchAlarmHistory,
  selectAlarmItem,
} from '../../actions/alarmHistory';
import demoImg from './demo.png';

import './index.styl';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  alarmHistoryList: state.alarmHistory.list,
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleAlarmHistoryVisible,
    fetchAlarmHistory: fetchAlarmHistory.startAction,
    selectAlarmItem,
  }, dispatch),
});

class NetworkAlarmHistory extends Component {
  state = {
    tabActive: 'face', // face car
    timeRange: {},
  }

  componentDidMount() {
    const { actions } = this.props;
    const { timeRange, tabActive } = this.state;
    actions.fetchAlarmHistory({ timeRange, tabActive });
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleAlarmHistoryVisible(false);
  }

  switchTab = ({ target }) => {
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type });
    }
  }

  onSelectItem = (item) => {
    const { actions } = this.props;
    actions.selectAlarmItem(item.id);
  }

  onTimeChange = (dates) => {
    console.log(dates);
  }

  onSearch = () => {
    console.log('search');
  }

  renderTypeTab() {
    const { tabActive } = this.state;
    return (
      <div className="type-tab" onClick={this.switchTab}>
        <span
          className={classnames({ active: tabActive === 'face' })}
          data-type="face"
        >人脸告警</span>
        <span
          className={classnames({ active: tabActive === 'car' })}
          data-type="car"
        >车辆告警</span>
      </div>
    );
  }

  renderAlarmList() {
    const { alarmHistoryList } = this.props;
    return (
      <ul className="alarm-list corner-border">
        {
          alarmHistoryList.map((item, index) => (
            <li key={item.name + index} onClick={() => this.onSelectItem(item)} className="alarm-item">
              <img src={demoImg} alt=""/>
              <div className="alarm-desc">
                <span className="name">{item.name}</span>
                <span className="time">
                  告警时间：{item.time}
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { alarmHistoryVisible } = this.props;
    if (!alarmHistoryVisible) {
      return null;
    }
    return (
      <div className="network-alarm-history-wrapper">
        <Title name="联网告警历史" onClose={this.handleClose} />
        {this.renderTypeTab()}
        <hr />
        <TimeRangeSearch onSearch={this.onSearch} onTimeChange={this.onTimeChange} />
        {this.renderAlarmList()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkAlarmHistory);

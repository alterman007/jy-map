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
    timeRange: [],
  }
  componentDidUpdate(pp) {
    if (this.props.alarmHistoryVisible && !pp.alarmHistoryVisible) {
      this.onSearch();
    }
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleAlarmHistoryVisible(false);
  }

  switchTab = ({ target }) => {
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type }, () => {
        this.onSearch();
      });
    }
  }

  onSelectItem = (item) => {
    const { actions } = this.props;
    item.type = this.state.tabActive;
    actions.selectAlarmItem(item);
  }

  onTimeChange = (dates) => {
    this.setState({
      timeRange: dates,
    });
  }

  onSearch = () => {
    const { actions } = this.props;
    const { timeRange, tabActive } = this.state;
    actions.fetchAlarmHistory({ timeRange, tabActive });
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
    const { tabActive } = this.state;
    const isFace = tabActive === 'face';
    return (
      <ul className="alarm-list corner-border">
        {
          alarmHistoryList.map((item) => {
            return (
            <li key={isFace ? item.alarmId : item.vehicleid} onClick={() => this.onSelectItem(item)} className="alarm-item">
              <img src={isFace ? item.facePicUrl : item.picVehicle } alt=""/>
              <div className="alarm-desc">
                <span className="name">
                  {isFace ? item.humanName : item.plateInfo}
                </span>
                <span className="time">
                  告警时间：{isFace ? item.alarmTime : item.passTimeStr }
                </span>
              </div>
            </li>
            )
          })
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
        <TimeRangeSearch onSearch={this.onSearch} history onTimeChange={this.onTimeChange} />
        {this.renderAlarmList()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkAlarmHistory);

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
  setAlarmHistoryListIsSelected
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
    setAlarmHistoryListIsSelected
  }, dispatch),
});

class NetworkAlarmHistory extends Component {
  state = {
    tabActive: 'face', // face car
    timeRange: [],
    selectedId: null
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
    console.log(target.dataset)
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type }, () => {
        this.onSearch();
      });
    }
  }

  onSelectItem = (item) => {
    // const alarmHistoryList = [...this.props.alarmHistoryList]
    // alarmHistoryList.map(alarm => {
    //   alarm.id === item.id ? alarm.isSelected = true : alarm.isSelected = false
    // })
    this.setState({
      selectedId: item.id
    })
    const { actions } = this.props;
    item.type = this.state.tabActive;
    actions.selectAlarmItem(item);
    // actions.setAlarmHistoryListIsSelected(alarmHistoryList)
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
    const { tabActive, selectedId} = this.state;
    const isFace = tabActive === 'face';
    return (
      <ul className="alarm-list corner-border">
        {
          alarmHistoryList.map((item) => {
            return (
              <li key={item.id} onClick={() => this.onSelectItem(item)} className={`${item.id == selectedId ? 'isSelected alarm-item' : 'alarm-item'}`}>
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

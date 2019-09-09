import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import ImageLazyLoad from '../../components/ImageLazyLoad';
import {
  toggleAlarmHistoryVisible,
  fetchAlarmHistory,
  selectAlarmItem,
  setAlarmHistoryListIsSelected
} from '../../actions/alarmHistory';

import './index.styl';
import { message } from 'antd';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  alarmHistoryList: state.alarmHistory.list,
  movePath: state.map.movePath
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
    timeRange: '',
    selectedId: null
  }

  alarm = '';

  componentDidUpdate(pp) {
    if (this.props.alarmHistoryVisible && !pp.alarmHistoryVisible) {
      this.onSearch();
    }
  }

  componentDidMount() {
    console.log(this.alarm)
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleAlarmHistoryVisible(false);
  }

  switchTab = ({ target }) => {
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type, timeRange: '' }, () => {
        this.onSearch();
      });
    }
  }

  onSelectItem = (item) => {
    if(!+item.latitude || !+item.longitude ) return message.warning("暂无定位信息");
    this.setState({
      selectedId: item.id
    })
    const { actions } = this.props;
    item.type = this.state.tabActive;
    actions.selectAlarmItem(item);
  }

  onTimeChange = (time) => {
    this.setState({
      timeRange: time,
    });
  }

  onSearch = () => {
    console.log("ceshi")
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
    // const test = "http://img4.bdimg.com/it/u=3565682627,2876030475&fm=26&gp=0.jpg"
    return (
      <ul className="alarm-list corner-border">
        {
          alarmHistoryList.length > 0 ? alarmHistoryList.map((item) => {
            return (
              <li key={item.id} onClick={() => this.onSelectItem(item)} className={`${item.id == selectedId ? 'isSelected alarm-item' : 'alarm-item'}`}>
                <ImageLazyLoad imgsrc={isFace ? item.facePicUrl : item.picVehicle} />
              {/* <img src={isFace ? item.facePicUrl : item.picVehicle } alt=""/> */}
              <div className="alarm-desc">
                <span className="name">
                  {isFace ? item.humanName : item.plateInfo}
                </span>
                <span className="time">
                  {/* 告警时间： */}
                  {isFace ? item.alarmTime : item.passTimeStr }
                </span>
              </div>
            </li>
            )
          }) : 
            <li className="search-by-time">暂无当日数据, 选择日期以查询</li>
        }
      </ul>
    );
  }

  render() {
    const { alarmHistoryVisible, movePath } = this.props;
    if(movePath) return null;
    if (!alarmHistoryVisible) {
      return null;
    }
    return (
      <div className="network-alarm-history-wrapper" ref={this.alarm}>
        <Title name="联网告警历史" onClose={this.handleClose} />
        {this.renderTypeTab()}
        {/* <hr /> */}
        <TimeRangeSearch onSearch={this.onSearch} history onTimeChange={this.onTimeChange} />
        {this.renderAlarmList()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkAlarmHistory);

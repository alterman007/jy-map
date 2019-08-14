import React, { Component, Fragment } from 'react';
import Title from '../../components/Title';
import AlarmItem from './AlarmItem';
import alarmIcon from './alarmIcon.png';

import './index.styl';

class RealTimeAlarm extends Component {
  state = {
    hideList: false,
    alarmList: [
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
    ],
  };

  toggleAlarmVisible = () => {
    // console.log('hello world');
    this.setState({
      hideList: !this.state.hideList,
    });
  }

  renderIcon() {
    return <img onClick={this.toggleAlarmVisible} className="alarm-icon" src={alarmIcon} alt="警告" />;
  }

  renderContent() {
    const { alarmList } = this.state;
    return (
      <div className="real-time-alarm-info">
        <Fragment>
          <Title 
            name="实时告警"
            onClose={this.toggleAlarmVisible}
          />
          <ul className="alarm-item-list">
            {
              alarmList.map((item, index) => <AlarmItem key={item.name + index} {...item} />)
            }
          </ul>
        </Fragment>
      </div>
    );
  }

  render() {
    const { hideList } = this.state;
    return (
      <div className="real-time-alarm-wrapper">
        {hideList ? this.renderIcon() : this.renderContent()}
      </div>
    )
  }
}

export default RealTimeAlarm;

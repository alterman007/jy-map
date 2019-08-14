import React, { Component } from 'react';
import classnames from 'classnames';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import './index.styl';

class NetworkAlarmHistory extends Component {
  state = {
    tabActive: 'face', // face car
  }

  switchTab = ({ target }) => {
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type });
    }
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
    )
  }
  render() {
    return (
      <div className="network-alarm-history-wrapper">
        <Title name="联网告警历史" />
        {this.renderTypeTab()}
        <TimeRangeSearch />
      </div>
    )
  }
}

export default NetworkAlarmHistory;
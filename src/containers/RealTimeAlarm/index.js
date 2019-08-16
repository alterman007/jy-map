import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Title from '../../components/Title';
import AlarmItem from './AlarmItem';
import {
  selectAlarmItem,
} from '../../actions/alarmHistory';
import alarmIcon from './alarmIcon.png';

import './index.styl';

const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    selectAlarmItem,
  }, dispatch),
});
class RealTimeAlarm extends Component {
  state = {
    hideList: true,
    alarmList: [
      { id: 401, type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { id: 402, type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { id: 403, type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
    ],
  };

  toggleAlarmVisible = () => {
    // console.log('hello world');
    this.setState({
      hideList: !this.state.hideList,
    });
    const { actions } = this.props;
    actions.selectAlarmItem(null);
  }

  onSelectItem = (item) => {
    const { actions } = this.props;
    actions.selectAlarmItem(item.id);
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
              alarmList.map((item, index) => (
                <AlarmItem
                  onClick={this.onSelectItem.bind(this, item)}
                  key={item.name + index}
                  {...item}
                />
              ))
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

export default connect(null, mapDispatchProps)(RealTimeAlarm);

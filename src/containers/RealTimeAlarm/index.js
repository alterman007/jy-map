import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Title from '../../components/Title';
import AlarmItem from './AlarmItem';
import {
  selectAlarmItem,
} from '../../actions/alarmHistory';
import { getRealAlarm } from '../../request/api';
import alarmIcon from './alarmIcon.png';

import './index.styl';

const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    selectAlarmItem,
  }, dispatch),
});
class RealTimeAlarm extends Component {
  state = {
    hideList: false,
    alarmList: [],
  };

  toggleAlarmVisible = () => {
    this.setState({
      hideList: !this.state.hideList,
    });
  }

  onSelectItem = () => {
    // const { actions } = this.props;
    // actions.selectAlarmItem(item.id);
  }

  componentDidMount() {
    this.fetchList();
    this.timer = setInterval(() => {
      this.fetchList();
    }, 5000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  async fetchList() {
    const data = await getRealAlarm();
    this.setState({
      alarmList: data,
    });
  }

  renderIcon() {
    return <img onClick={this.toggleAlarmVisible} className="alarm-icon" src={alarmIcon} alt="警告" />;
    // return <span className="alarm-icon"></span>
  }

  renderContent() {
    const { alarmList } = this.state;
    console.log('alarmlist', alarmList)
    return (
      <div className="real-time-alarm-info">
        <Fragment>
          <Title
            name="实时告警"
            onClose={this.toggleAlarmVisible}
          />
          <ul className="alarm-item-list corner-border">
            {
              alarmList ? alarmList.map((item) => {
               return <AlarmItem
                  onClick={this.onSelectItem.bind(this, item)}
                  key={item.id+item.name}
                  {...item}
                />
              }): <li className="search-by-time">暂无实时数据</li>
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

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
    hideList: true,
    alarmList: [],
  };

  toggleAlarmVisible = () => {
    this.setState({
      hideList: !this.state.hideList,
    });
    this.fetchList();
  }

  onSelectItem = () => {
    // const { actions } = this.props;
    // actions.selectAlarmItem(item.id);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.fetchList();
    }, 10000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  async fetchList() {
    const { data } = await getRealAlarm();
    this.setState({
      alarmList: data,
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
          <ul className="alarm-item-list corner-border">
            {
              alarmList.map((item) => (
                <AlarmItem
                  onClick={this.onSelectItem.bind(this, item)}
                  key={item.alarmId || item.vehicleid}
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

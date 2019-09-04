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
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.fetchList();
    }, 5000);
  }

  onSelectItem = () => {
    // const { actions } = this.props;
    // actions.selectAlarmItem(item.id);
  }

  componentDidMount() {
    this.fetchList();
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
    // return <span className="alarm-icon"></span>
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
              alarmList.map((item) => {
               return <AlarmItem
                  onClick={this.onSelectItem.bind(this, item)}
                  key={item.alarmId || item.id}
                  {...item}
                />
              })
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

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
import { getuuid } from '../../utils/func';
import AlarmWhistle from '../../components/ AlarmWhistle';

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
    if (!data.res && this.state.hideList) {     
      this.setState({
        alarmList: data,
        hideList: false
      });
    } else {
      this.setState({
        alarmList: data
      })
    }
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
              alarmList.list ? alarmList.list.map((item) => {
                return <AlarmItem
                  key={getuuid()}
                  {...item}
                />
              }) : <li className="search-by-time">暂无实时数据</li>
            }
          </ul>
        </Fragment>
      </div>
    );
  }

  render() {
    const { hideList, alarmList } = this.state;
    return (
      <>
        <div className="real-time-alarm-wrapper">
          {hideList ? this.renderIcon() : this.renderContent()}
        </div>

        <AlarmWhistle
          alarmList={alarmList}
        />
      </>
    )
  }
}

export default connect(null, mapDispatchProps)(RealTimeAlarm);

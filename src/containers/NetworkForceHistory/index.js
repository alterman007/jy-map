import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import { toggleForceHistoryVisible } from '../../actions/forceHistory';
import demoImg from './demo.png';

import './index.styl';

const mapStateToProps = (state) => ({
  forceHistoryVisible: state.forceHistory.visible,
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({ toggleForceHistoryVisible }, dispatch),
});

class NetworkForceHistory extends Component {
  state = {
    tabActive: 'face', // face car
    timeRange: {},
    forceList: [
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
      { type: '人脸告警', name: '宁静', time: '2019.08.11 23:32:20' },
    ],
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible(false);
  }

  switchTab = ({ target }) => {
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type });
    }
  }

  onTimeChange = (dates) => {
    console.log(dates);
  }

  onSearch = () => {
    console.log('search');
  }

  renderForceList() {
    const { forceList } = this.state;
    return (
      <ul className="force-list">
        {
          forceList.map((item, index) => (
            <li key={item.name + index} className="force-item">
              <img src={demoImg} alt=""/>
              <div className="force-desc">
                <span className="name">{item.name}</span>
                <span className="time">
                  告警时间：{item.time}
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { forceHistoryVisible } = this.props;
    if (!forceHistoryVisible) {
      return null;
    }
    return (
      <div className="network-force-history-wrapper">
        <Title name="联网警力历史" onClose={this.handleClose} />
        <TimeRangeSearch onSearch={this.onSearch} onTimeChange={this.onTimeChange} />
        {this.renderForceList()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkForceHistory);

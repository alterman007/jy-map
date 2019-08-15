import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import {
  toggleForceHistoryVisible,
  fetchForceHistory,
  selectForceItem,
} from '../../actions/forceHistory';
import demoImg from './demo.png';

import './index.styl';

const mapStateToProps = (state) => ({
  forceHistoryVisible: state.forceHistory.visible,
  forceHistoryList: state.forceHistory.list,
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleForceHistoryVisible,
    selectForceItem,
    fetchForceHistory: fetchForceHistory.startAction,
  }, dispatch),
});

class NetworkForceHistory extends Component {
  state = {
    tabActive: 'face', // face car
    timeRange: {},
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchForceHistory();
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

  onSelectItem = (item) => {
    const { actions } = this.props;
    actions.selectForceItem(item);
  }

  renderForceList() {
    const { forceHistoryList } = this.props;
    return (
      <ul className="force-list corner-border">
        {
          forceHistoryList.map((item, index) => (
            <li key={item.name + index} onClick={() => this.onSelectItem(item)} className="force-item">
              <img src={demoImg} alt=""/>
              <div className="force-desc">
                <span className="name">
                  {item.name}
                </span>
                <span className="item">
                  所属派出所：{item.belongTo}
                </span>
                <span className="item">
                  设备号：{item.deviceCode}
                </span>
                <span className="item">
                  日期：{item.time}
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

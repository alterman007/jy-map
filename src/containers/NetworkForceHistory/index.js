import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimeRangeSearch from '../../components/TimeRangeSearch';
// import ForceDetail from '../ForceDetail';
import Title from '../../components/Title';
import {
  toggleForceHistoryVisible,
  fetchForceHistory,
  selectForceHistoryItem,
  setForceHistoryListIsSelected
} from '../../actions/forceHistory';
import {
  selectRealTimeMarker,
} from '../../actions/map';
import demoImg from './demo.png';

import './index.styl';

const mapStateToProps = (state) => ({
  forceHistoryVisible: state.forceHistory.visible,
  forceHistoryList: state.forceHistory.list,
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleForceHistoryVisible,
    fetchForceHistory: fetchForceHistory.startAction,
    selectForceHistoryItem,
    selectRealTimeMarker,
    setForceHistoryListIsSelected
  }, dispatch),
});

class NetworkForceHistory extends Component {
  state = {
    timeRange: {},
    selectId: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.forceHistoryVisible) {
      return {
        selectedId: null,
      };
    }
    return null;
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchForceHistory();
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible(false);
    actions.selectRealTimeMarker(null);
    actions.selectForceHistoryItem(null);
  }

  onTimeChange = (dates) => {
    console.log(dates);
  }

  onSearch = () => {
    console.log('search');
  }

  onSelectItem = (item) => {
    // const forceHistoryList = [...this.props.forceHistoryList];
    // forceHistoryList.map(force => {
    //   if (force.id === item.id) {
    //     force.isSelect = true
    //   } else {
    //     force.isSelect = false
    //   }
    // })
    this.setState({
      selectId: item.id
    })
    const { actions } = this.props;
    // actions.setForceHistoryListIsSelected(forceHistoryList)
    actions.selectForceHistoryItem(item);
    actions.selectRealTimeMarker(null);
  }

  renderForceList() {
    const { forceHistoryList } = this.props;
    const { selectId } = this.state;
    return (
      <ul className="force-list corner-border">
        {
          forceHistoryList.map((item, index) => {
            console.log(item.id, selectId)
            return (
            <li key={item.name + index} ref="li" onClick={() => this.onSelectItem(item)} className={`${item.id === selectId ? 'active force-item' : 'force-item'} `}>
              <img src={demoImg} alt="" />
              <div className="force-desc">
                <span className="name">
                  {item.name}
                </span>
                <span className="item">
                  所属派出所：{item.sspcs}
                </span>
                <span className="item">
                  设备号：{item.indexCode}
                </span>
                <span className="item">
                  日期：{item.createTime}
                </span>
              </div>
            </li>
           )
          })
        }
      </ul>
    );
  }

  // renderDetail() {
  //   const { selectedId } = this.state;
  //   if (selectedId) {
  //     return <ForceDetail detailId={selectedId} />;
  //   }
  // }

  render() {
    const { forceHistoryVisible } = this.props;
    if (!forceHistoryVisible) {
      return null;
    }
    return (
      <div className="network-force-history-wrapper">
        <Title name="联网警力历史" onClose={this.handleClose} />
        <TimeRangeSearch onSearch={this.onSearch} history onTimeChange={this.onTimeChange} />
        {this.renderForceList()}
        {/* {this.renderDetail()} */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkForceHistory);

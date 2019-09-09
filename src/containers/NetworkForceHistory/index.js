import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForceHistoryList from './Component/ForceHistoryList';
import Title from '../../components/Title';
import {
  toggleForceHistoryVisible,
  selectForceHistoryItem,
  fetchForceHistory,
} from '../../actions/forceHistory';
import {
  selectRealTimeMarker,
} from '../../actions/map';
import './index.styl';

const mapStateToProps = (state) => ({
  forceHistoryVisible: state.forceHistory.visible,
  // forceHistoryList: state.forceHistory.list,
  movePath: state.map.movePath
});

const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleForceHistoryVisible,
    selectForceHistoryItem,
    fetchForceHistory: fetchForceHistory.startAction,
    selectRealTimeMarker,
  }, dispatch),
});

class NetworkForceHistory extends Component {
  componentDidMount() {
    this.props.actions.fetchForceHistory()
  }
  handleClose = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible(false);
    actions.selectRealTimeMarker(null);
    actions.selectForceHistoryItem(null);
  }
  render() {
    const { forceHistoryVisible, movePath } = this.props;
    if (movePath) return null;
    return (
      <>
        {
          forceHistoryVisible &&
          <div className="network-force-history-wrapper">
            <Title name="联网警力历史" onClose={this.handleClose} />
            {/* <TimeRangeSearch onSearch={this.onSearch} history onTimeChange={this.onTimeChange} /> */}
            <ForceHistoryList />
          </div>
        }
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkForceHistory);

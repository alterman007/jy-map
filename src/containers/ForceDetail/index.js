import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import ForceSnapshot from '../ForceSnapshot';
import { fetchForcePath, selectForceHistoryItem } from '../../actions/forceHistory';
import { setMapPath, selectRealTimeMarker } from '../../actions/map';
import demoImg from './demo.png';
import './index.styl';

// const mapStateToProps = (state) => ({
//   detailId: state.forceHistory.detailId,
// });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
    selectRealTimeMarker,
    selectForceHistoryItem,
    setMapPath,
  }, dispatch),
});

class ForceDetail extends Component {
  pickerStyle = {
    width: '100%',
    background: 'rgba(71,156,223,0.30)',
  };

  state = {
    fromTime: null,
    toTime: null,
    showType: false,
  };

  changeShowType(showType) { // snapshot | path | video | false
    this.setState({ showType });
    // if (showType === 'path') {
    //   this.onSearchPath();
    // }
    if (showType === 'video') {
      this.playVideo();
    }
  }

  componentWillUnmount() {
    this.onClose();
  }

  onClose = () => {
    const { actions } = this.props;
    actions.selectRealTimeMarker(null);
    actions.selectForceHistoryItem(null);
    actions.setMapPath(null);
  }

  playVideo = () => {
    console.log('open video', this.props.detailId);
  }

  onTimeChange(type, date) {
    this.setState({ type: date });
    // console.log(type, date);
  }

  onSearchPath(moveFlag) {
    const { actions } = this.props;
    const { fromTime, toTime } = this.state;
    actions.fetchForcePath({ from: fromTime, to: toTime, moveFlag });
  }

  onPlay = () => {
    // const { actions }
  }

  renderAction() {
    if (this.state.showType === 'path') {
      return this.renderTimeSearch();
    }
    return (
      <div className="action-detail-wrapper">
        <button onClick={this.changeShowType.bind(this, 'snapshot')}>联网抓拍</button>
        <button onClick={this.changeShowType.bind(this, 'path')}>单兵轨迹</button>
        <button onClick={this.changeShowType.bind(this, 'video')}>监控点播</button>
        <button onClick={this.onClose}>关&nbsp;&nbsp;&nbsp;&nbsp;闭</button>
      </div>
    );
  }

  renderTimeSearch() {
    return (
      <div className="timer-range-search">
        <div className="split-line" />
        <DatePicker
          className="data-picker"
          showTime
          placeholder="开始时间"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'fromTime')}
          style={this.pickerStyle}
          size="large"
        />
        <DatePicker
          className="data-picker"
          showTime
          placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'toTime')}
          style={this.pickerStyle}
          size="large"
        />
        <div className="action-detail-wrapper">
          <button onClick={this.onSearchPath.bind(this, false)}>查&nbsp;&nbsp;&nbsp;&nbsp;询</button>
          <button onClick={this.onSearchPath.bind(this, true)}>播&nbsp;&nbsp;&nbsp;&nbsp;放</button>
          <button onClick={this.onClose}>完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
        </div>
      </div>
    );
  }

  render() {
    const { detail } = this.props;
    // console.log(detail);
    if (!detail) {
      return null;
    }
    if (this.state.showType === 'snapshot') {
      return <ForceSnapshot defaultValue={detail} onClose={this.onClose} />;
    }
    return (
      <div className="force-detail-wrapper corner-border-highlight-bg">
        <img src={demoImg} alt="背景图片" />
        <div className="h6-name">{detail.name}</div>
        <div className="info">
          所属派出所：{detail.sspcs}
        </div>
        <div className="info">
          设备号：{detail.indexCode}
        </div>
        <div className="info">
          经 度：{detail.lng}
        </div>
        <div className="info">
          纬 度：{detail.lat}
        </div>
        <div className="info">
          日 期：{detail.createTime}
        </div>
        <div className="info">
          WIFI嗅探数：{detail.wificount}
        </div>
        {this.renderAction()}
        {/* {this.renderSnapshot()} */}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ForceDetail);

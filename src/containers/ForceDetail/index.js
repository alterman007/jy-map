import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import ForceSnapshot from '../ForceSnapshot';
import { fetchForcePath, selectForceHistoryItem } from '../../actions/forceHistory';
import { setMapPath, selectRealTimeMarker } from '../../actions/map';
import { setTransFormToLeft } from '../../actions/cpmStatus';
import demoImg from './demo.png';
import './index.styl';
import { monitorPlay } from '../../request/api';
import moment from 'moment';

// const mapStateToProps = (state) => ({
//   detailId: state.forceHistory.detailId,
// });

const Left0 = 'tranformToLeft0';
const Left530 = 'tranformToLeft530';
const classes = 'force-detail-wrapper corner-border-highlight-bg ';

const mapStateToProps = (state) => {
  
  return {
    tranformToLeft: state.cmpStatus.tranformToLeft
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
    selectRealTimeMarker,
    selectForceHistoryItem,
    setMapPath,
    setTransFormToLeft
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
    showType: false
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
    actions.setTransFormToLeft('')
  }

  playVideo = () => {
    monitorPlay(this.props.detail.indexCode)
  }

  onTimeChange(type, undef, date) {
    this.setState({ [type]: date });
  }

  async onSearchPath(moveFlag) {
    const { actions } = this.props;
    const { fromTime , toTime } = this.state;
    const config = {
      name: this.props.detail.name,
      moveFlag
    }
    if(toTime) {
      config.biggintime = moment(toTime).format('YYYY-MM-DD 00:00:00');
      config.endtime = toTime
    } else {
      config.endtime= moment().format('YYYY-MM-DD HH:mm:ss')
      config.biggintime = moment(config.endtime).format('YYYY-MM-DD 00:00:00')
    }
    actions.fetchForcePath(config)
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
        <button onClick={this.changeShowType.bind(this, 'path')}>车辆轨迹</button>
        <button onClick={this.changeShowType.bind(this, 'video')}>监控点播</button>
        <button onClick={this.onClose}>关&nbsp;&nbsp;&nbsp;&nbsp;闭</button>
      </div>
    );
  }

  renderTimeSearch() {
    return (
      <div className="timer-range-search">
        <div className="split-line" />
        {/* <DatePicker
          className="data-picker"
          showTime
          placeholder="输入时间"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'fromTime')}
          style={this.pickerStyle}
          size="large"
        /> */}
        <DatePicker
          className="data-picker"
          showTime
          placeholder="选择时间"
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
    const { detail, tranformToLeft } = this.props;
    if (!detail) {
      return null;
    }
    if (this.state.showType === 'snapshot') {
      return <ForceSnapshot defaultValue={detail} onClose={this.onClose} />;
    }
    return (
      <div className={tranformToLeft + ' ' + classes}>
        <img src={detail.pic} alt="背景图片" />
        <div className="h6-name">{detail.name}</div>
        <div className="info">
          所属派出所：{detail.pcs}
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

export default connect(mapStateToProps, mapDispatchToProps)(ForceDetail);

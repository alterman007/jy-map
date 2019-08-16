import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchForcePath } from '../../actions/forceHistory';
import { setMapPath } from '../../actions/map';
import { getAlarmDetailById } from '../../request/api';
import demoImg from './demo.png';
import './index.styl';

// const mapStateToProps = (state) => ({
//   detailId: state.forceHistory.detailId,
// });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
    setMapPath,
  }, dispatch),
});

class AlarmDetail extends Component {
  state = {
    detail: {},
  };

  showPath = () => {
    const { actions } = this.props;
    actions.fetchForcePath();
  }

  async setDetail() {
    const { data } = await getAlarmDetailById(this.props.detailId);
    this.setState({ detail: data });
  }

  componentDidMount() {
    this.setDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detailId !== this.props.detailId) {
      this.setDetail();
    }
  }

  renderAction() {
    return (
      <div className="action-detail-wrapper">
        <button onClick={this.showPath}>人脸轨迹</button>
      </div>
    );
  }

  render() {
    const { detailId } = this.props;
    const { detail } = this.state;
    if (!detailId) {
      return null;
    }
    return (
      <div className="alarm-detail-wrapper corner-border-warning">
        <img src={demoImg} alt="背景图片" />
        <div className="h6-name">{detail.name}</div>
        {
          detail.type === 'face' && <div className="info">
            身份证：{detail.identity}
          </div>
        }
        <div className="info">
          经 度：{detail.lng}
        </div>
        <div className="info">
          纬 度：{detail.lat}
        </div>
        <div className="info">
          告警日期：{detail.time}
        </div>
        <div className="info">
          告警类别：<span className="warning">{detail.type === 'face' ? '人脸告警' : '车辆告警'}</span>
        </div>
        <div className="info">
          设备号：{detail.deviceCode}
        </div>
        <div className="info">
          所在区域：{detail.position}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AlarmDetail);

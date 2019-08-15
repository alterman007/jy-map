import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchForcePath } from '../../actions/forceHistory';
import { getForceDetailById } from '../../request/api';
import demoImg from './demo.png';
import './index.styl';

const mapStateToProps = (state) => ({
  detailId: state.forceHistory.detailId,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
  }, dispatch),
});

class ForceDetail extends Component {
  state = {
    detail: null,
  };

  showPath = () => {
    const { actions, detailId } = this.props;
    actions.fetchForcePath(detailId);
  }

  playVideo = () => {
    console.log('open video', this.props.detailId);
  }

  renderAction() {
    return (
      <div className="action-detail-wrapper">
        <button>联网抓拍</button>
        <button onClick={this.showPath}>单兵轨迹</button>
        <button onClick={this.playVideo}>监控点播</button>
      </div>
    );
  }

  async setDetail() {
    const { data } = await getForceDetailById(this.props.id);
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

  render() {
    const { detailId } = this.props;
    const { detail } = this.state;
    // console.log(this.props.detailId, detail);
    if (!detailId) {
      return null;
    }
    return (
      <div className="force-detail-wrapper corner-border">
        <img src={demoImg} alt="背景图片" />
        <div className="h6-name">{detail.name}</div>
        <div className="info">
          所属派出所：{detail.belongTo}
        </div>
        <div className="info">
          设备号：{detail.deviceCode}
        </div>
        <div className="info">
          经 度：{detail.lng}
        </div>
        <div className="info">
          纬 度：{detail.lat}
        </div>
        <div className="info">
          日 期：{detail.time}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForceDetail);

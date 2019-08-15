import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForceSnapshot from '../ForceSnapshot';
import { fetchForcePath } from '../../actions/forceHistory';
import { setMapPath } from '../../actions/map';
import { getForceDetailById } from '../../request/api';
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

class ForceDetail extends Component {
  state = {
    detail: {},
    showType: false,
  };

  changeShowType(showType) { // snapshot | path | video | false
    this.setState({ showType });
    const { actions } = this.props;
    if (showType === 'path') {
      actions.fetchForcePath();
    } else {
      actions.setMapPath(null);
    }
    if (showType === 'video') {
      this.playVideo();
    }
  }

  toggleSnapshot = () => {
    this.setState({ showSnapshot: !this.state.showSnapshot })
  }

  playVideo = () => {
    console.log('open video', this.props.detailId);
  }

  renderAction() {
    return (
      <div className="action-detail-wrapper">
        <button onClick={this.changeShowType.bind(this, 'snapshot')}>联网抓拍</button>
        <button onClick={this.changeShowType.bind(this, 'path')}>单兵轨迹</button>
        <button onClick={this.changeShowType.bind(this, 'video')}>监控点播</button>
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
      this.changeShowType(false);
    }
  }

  renderSnapshot() {
    if (this.state.showType === 'snapshot') {
      return <ForceSnapshot />;
    }
    return null;
  }

  render() {
    const { detailId } = this.props;
    const { detail } = this.state;
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
        {this.renderSnapshot()}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ForceDetail);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import {
  fetchForcePath,
} from '../../actions/forceHistory';
import {
  selectAlarmItem,
} from '../../actions/alarmHistory';
import {
  setMapPath,
  setAlarmHistoryDetail,
} from '../../actions/map';
import { setTransFormToLeft, setIshowHDPICModal } from '../../actions/cpmStatus';
// import { getAlarmDetailById } from '../../request/api';
import './index.styl';
import { alarmType } from '../../constants/alarmConstants';

// const mapStateToProps = (state) => ({
//   detailId: state.forceHistory.detailId,
// });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchForcePath: fetchForcePath.startAction,
    setMapPath,
    setAlarmHistoryDetail,
    selectAlarmItem,
    setTransFormToLeft,
    setIshowHDPICModal
  }, dispatch),
});

const mapStateToProps = (state) => {
  return {
      tranformToLeft: state.cmpStatus.tranformToLeft
  }
}

class AlarmDetail extends Component {
  pickerStyle = {
    width: '100%',
    background: '#A5303055',
  };

  state = {
    showTimeSearch: false,
    fromTime: null,
    toTime: null,
  };

  showPath = () => {
    this.setState({
      showTimeSearch: true,
    });
  }

  close = () => {
    const { actions } = this.props;
    actions.setMapPath(null);
    actions.selectAlarmItem(null);
    actions.setAlarmHistoryDetail(null);
    actions.setTransFormToLeft('')
  }

  onSearchPath = () => {
    const { detail, actions } = this.props;
    const { fromTime, toTime } = this.state;
    const config = {
      humanId : detail.id,
      moveFlag: false,
      biggintime: fromTime,
      endtime: toTime
    }
    // if(toTime) {
    //   config.endtime = toTime
    //   config.biggintime = moment(toTime).format('YYYY-MM-DD HH:mm:ss')
    // } else {
    //   config.endtime = moment().format('YYYY-MM-DD HH:mm:ss')
    //   config.biggintime = moment(config.endtime).format('YYYY-MM-DD HH:mm:ss')
    // }
    actions.fetchForcePath(config);
  }

  onTimeChange(type, undef, date) {
    this.setState({ [type]: date });
  }
  showHDPICModal(item) {
    let type, name, time, imgsrc, address, hdpic;
    type = item.type;
    name = item.name;
    time = item.alarmTime;
    imgsrc = item.baseImage;
    address = item.address;
    hdpic = item.hdpicImage;
    this.props.actions.setIshowHDPICModal({
      type, name, time, imgsrc, address, hdpic,
      ishow: true,
    })
  }
  renderAction() {
    const { detail } = this.props;
    const { showTimeSearch } = this.state;
    if (showTimeSearch) {
      return this.renderTimeSearch();
    }
    return (
      <div className="action-detail-wrapper">
        {
          detail.type === 1 && <button onClick={this.showPath}>人脸轨迹</button>
        }
        <button onClick={this.showHDPICModal.bind(this, detail)}>高清大图</button>
        <button onClick={this.close}>关闭</button>
      </div>
    );
  }

  renderTimeSearch() {
    return (
      <div className="timer-range-search">
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
          placeholder='结束时间'
          format="YYYY-MM-DD HH:mm:ss"
          onChange={this.onTimeChange.bind(this, 'toTime')}
          style={this.pickerStyle}
          size="large"
        />
        <div className="action-detail-wrapper">
          <button onClick={this.onSearchPath}>查&nbsp;&nbsp;&nbsp;&nbsp;询</button>
          <button onClick={this.close}>完&nbsp;&nbsp;&nbsp;&nbsp;成</button>
        </div>
      </div>
    );
  }

  render() {
    const { detail, tranformToLeft } = this.props;
    if (!detail) {
      return null;
    }
    console.log("detail", detail);
    return (
      <div className={tranformToLeft + " alarm-detail-wrapper corner-border-warning"}>
        <img src={detail.bkgPicUrl || detail.picVehicle} alt="背景图片" />
        <div className="h6-name">{detail.humanName || detail.plateInfo}</div>
        {
          detail.type === 1 && <div className="info">
            身份证：{detail.humans && detail.humans[0] && detail.humans[0].credentialsNum}
          </div>
        }
        <div className="info">
          经 度：{detail.lng.toString().substr(0, 10)}
        </div>
        <div className="info">
          纬 度：{detail.lng.toString().substr(0, 10)}
        </div>
        <div className="info">
          告警日期：{detail.alarmTime}
        </div>
        <div className="info">
          告警类别：<span className="warning">{alarmType[detail.type]}</span>
        </div>
        {
          detail.type === 3 &&
          <div className="info">
          告警原因：<span className="warning">{detail.reason}</span>
        </div>
        }
        <div className="info">
          设备号：{detail.indexCode}
        </div>
        <div className="info">
          所在区域：{detail.address}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmDetail);

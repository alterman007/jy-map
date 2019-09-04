import React from 'react';
import classnames from 'classnames';
import Rotate from './rotate';
import './index.styl';
import { connect } from 'react-redux';
import { toggleAlarmHistoryVisible } from '../../actions/alarmHistory';
import { toggleForceHistoryVisible } from '../../actions/forceHistory';
import { setIshowRadioMarkers, setIshowCarMarkers, setIshowHeatLayers, setIshowMonitorMarkers } from '../../actions/cpmStatus';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  forceHistoryVisible: state.forceHistory.visible,
  iShowRadioMarkers: state.map.iShowRadioMarkers,
  iShowCarMarkers: state.map.iShowCarMarkers,
  iShowHeatLayers: state.map.iShowHeatLayers,
  iShowMonitorMarkers: state.map.iShowMonitorMarkers
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleAlarmHistoryVisible,
    toggleForceHistoryVisible,
    setIshowRadioMarkers,
    setIshowCarMarkers,
    setIshowHeatLayers,
    setIshowMonitorMarkers
  }, dispatch),
});


class Switcher extends React.Component {
  rotateRef = React.createRef();

  state = {
    buttonList: [
      '联网警力',
      '联网告警',
      '实时车辆',
      '实时电台',
      '热力图',
      '监控探头'
    ],
    clickedIndex: 0,
  };

  rotateByIndex(i) {
    const radio = 2 * i / this.state.buttonList.length * Math.PI;
    const r = 228;
    const x = r * Math.cos(radio);
    const y = r * Math.sin(radio);
    const rotate = 90 - 360 * i / this.state.buttonList.length;
    return ({
      transform: `translate(${x}px, ${y}px) rotateX(-90deg) translateY(-39%) rotateY(${rotate}deg)`,
    });
  }

  onClick(i) {
    switch (i) {
      case 0:
        this.handleForceClick()
        break;
      case 1:
        this.handleAlarmClick()
        break;
      case 2:
        this.handleRealCarClick()
        break;
      case 3:
        this.handleRadioClick()
        break;
      case 4:
        this.handleHeatClick()
        break;
      case 5:
        this.handleMonitorClick()
        break;
    
      default:
        break;
    }
    this.setState({
      clickedIndex: i,
    });
  }

  componentDidMount() {
    this.r = new Rotate(this.rotateRef.current);
    this.r.rotate();
  }

  componentWillUnmount() {
    this.r.destroy();
  }

  handleForceClick = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible();
    actions.toggleAlarmHistoryVisible(false);
  }

  handleAlarmClick = () => {
    const { actions } = this.props;
    actions.toggleForceHistoryVisible(false);
    actions.toggleAlarmHistoryVisible();
  }

  handleRadioClick = () => {
    this.props.actions.setIshowRadioMarkers()
  }

  handleRealCarClick = () => {
    this.props.actions.setIshowCarMarkers()
  }

  handleMonitorClick = () => {
    this.props.actions.setIshowMonitorMarkers()
  }

  handleHeatClick = () => {
    return message.warning("建设中...");
    this.props.actions.setIshowHeatLayers() 
  }

  isActive(i) {
    const { forceHistoryVisible, alarmHistoryVisible, iShowCarMarkers, iShowRadioMarkers,iShowHeatLayers, iShowMonitorMarkers } = this.props;
    return [forceHistoryVisible, alarmHistoryVisible, iShowCarMarkers, iShowRadioMarkers,iShowHeatLayers, iShowMonitorMarkers]
  }

  render() {
    const { buttonList, clickedIndex } = this.state;
    return (
      <div className="switcher-wrapper">
        <div className="btn-transform">
          <div className="btn-rotate" ref={this.rotateRef}>
            {
              buttonList.map((name, i) => (
                <div className="btn-center" key={name}>
                  <div
                    className={classnames("btn", {active: this.isActive()[i]})}
                    style={this.rotateByIndex(i)}
                    onClick={this.onClick.bind(this, i)}
                  >{name}</div>
                </div>
              ))
            }
          </div>
          {/* <div className="current">
            {buttonList[clickedIndex]}
          </div> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchProps)(Switcher);

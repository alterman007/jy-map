
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import {
  selectRealTimeMarker,
  setAlarmHistoryDetail,
} from '../../actions/map';
import { tipTypeIcon } from './icons';

const mapStateToProps = (state) => ({
  markers: state.map.realTimeMarkers,
  alarmMarker: state.map.alarmMarker,
  forceHistoryMarker: state.map.forceHistoryMarker,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectRealTimeMarker,
    setAlarmHistoryDetail,
  }, dispatch),
});

class RealTimeMarkers extends Component {
  handleCarClick(marker) {
    console.log('handleCarClick', marker);
    const { actions } = this.props;
    actions.selectRealTimeMarker(marker);
  }
  renderCameraMarker(marker, index) {
    return (
      <Marker key={marker.name + index} position={[marker.lat,marker.lng]} icon={tipTypeIcon(marker.type, marker.name)}>
        <Popup className="camera-marker-popup" direction="right" closeButton={false}>
          <div className="camera-info corner-border">
            <div className="name">{marker.name}</div>
            <div className="desc">接警单编号:{marker.id}</div>
            {/* <div className="desc">电台呼号:{}</div> */}
            <div className="desc">姓名:{marker.policeman}</div>
            <div className="desc">证件号码:{marker.zjhm}</div>
            <div className="desc">警员编号/车牌号:{marker.busnum1}</div>
            <div className="desc">警种名称:{marker.jcmc}</div>
            <div className="desc">单位名称:{marker.dwmc}</div>
            <div className="desc">电话号码:{marker.dhhm}</div>
            <div className="desc">纬度: {marker.lat}</div>
            <div className="desc">经度: {marker.lng}</div>
          </div>
        </Popup>
      </Marker>
    );
  }

  renderCarMarker(marker, index) {
    return (
      <Marker
        key={marker.name + index}
        position={[marker.lat, marker.lng]}
        onClick={this.handleCarClick.bind(this, marker.id)}
        icon={tipTypeIcon(marker.type, marker.name)}
      />
    );
  }

  renderWifiMarker(marker, index) {
    return (
      <Marker
        key={marker.name + index}
        position={[marker.lat, marker.lng]}
        icon={tipTypeIcon(marker.type, marker.name)}
      />
    );
  }

  renderPeopleMarker(marker, index) {
    return (
      <Marker key={marker.name + index} position={[marker.lat, marker.lng]} icon={tipTypeIcon(marker.type, marker.name)}>
        <Tooltip className="destination-tooltip" direction="right">
          {marker.name}
        </Tooltip>
      </Marker>
    );
  }

  renderSelectedMarker(marker) {
    return (
      <Marker
        key={marker.name}
        position={[marker.lat, marker.lng]}
        onClick={this.handleCarClick.bind(this, marker)}
        icon={tipTypeIcon(1, marker.name)}
      />
    );
  }
  renderAlarmMarker(marker) {
    const { setAlarmHistoryDetail } = this.props.actions;
    return (
      <Marker
        key={marker.name}
        position={[marker.lat, marker.lng]}
        onClick={setAlarmHistoryDetail.bind(this, marker)}
        icon={tipTypeIcon(1, marker.name)}
      />
    );
  }

  render() {
    const { markers, alarmMarker, forceHistoryMarker } = this.props;
    // console.log(markers, forceHistoryMarker);
    if (forceHistoryMarker && typeof forceHistoryMarker === 'object') {
      return this.renderSelectedMarker(forceHistoryMarker);
    }
    if (alarmMarker) {
      return this.renderAlarmMarker(alarmMarker);
    }

    return (
      <Fragment>
        {
          markers.map((marker, index) => {
            switch (marker.type) {
              case 1: // car
                return this.renderCarMarker(marker, index);
              case 2: // people
                return this.renderPeopleMarker(marker, index);
              // case 3: // wifi
              //   return this.renderWifiMarker(marker, index);
              case 3: // camera
                return this.renderCameraMarker(marker, index);
              default:
                return <div key={index}>unknown</div>
            }
          })
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeMarkers);


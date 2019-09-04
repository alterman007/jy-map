import React, { Component, Fragment } from 'react';
import L from 'leaflet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import {
  selectRealTimeMarker,
  setAlarmHistoryDetail,
} from '../../actions/map';
import HeatMap from './_HeatMap';
import { tipTypeIcon } from './icons';
import MarkerCluster from './MarkerCluster';
import { MapContext } from './context';
import { setMapZoom, fetchMapTrail, fetchRadioTrall } from '../../actions/map';
import { fetchIsAlarmComing } from '../../actions/cpmStatus';

const mapStateToProps = (state) => ({
  markers: state.map.realTimeMarkers,
  carMarkers: state.map.carMarkers,
  radioMarkers: state.map.radioMarkers,
  alarmMarker: state.map.alarmMarker,
  forceHistoryMarker: state.map.forceHistoryMarker,
  movePath: state.map.movePath,
  iShowCarMarkers: state.map.iShowCarMarkers,
  iShowRadioMarkers: state.map.iShowRadioMarkers,
  iShowHeatLayers: state.map.iShowHeatLayers
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectRealTimeMarker,
    setAlarmHistoryDetail,
    fetchMapTrail: fetchMapTrail.startAction,
    fetchIsAlarmComing: fetchIsAlarmComing.startAction,
    fetchRadioTrall: fetchRadioTrall.startAction
  }, dispatch),
});


class RealTimeMarkers extends Component {
  static contextType = MapContext

  componentDidMount() {
    const { fetchIsAlarmComing, fetchMapTrail, fetchRadioTrall } = this.props.actions
    fetchMapTrail()
    fetchRadioTrall()
    setInterval(() => {
      fetchMapTrail();
      fetchIsAlarmComing();
      fetchRadioTrall();
    },5000)
  }

  handleCarClick(marker) {
    const { actions } = this.props;
    // console.log(marker)
    // this.context.flyTo([marker.lat, marker.lng], 16)
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

  renderCarMarkers(markers, index) {
    return (
      markers.map((car, index) => (
        <Marker 
          key={car.name + index} 
          position={[car.lat, car.lng]} 
          icon={tipTypeIcon(1, car.name)}
          onClick={this.handleCarClick.bind(this, car.id)}
        >
        </Marker>
      ))
    );
  }

  renderRadioMarkers(markers) {
    markers.map(marker => {
      marker.options = {
        icon: tipTypeIcon(marker.type, marker.name),
        type: marker.type,
        id: marker.id,
        info: marker
      }
    });
    return <MarkerCluster
      markers={markers}
      wrapperOptions={{enableDefaultStyle: true}}
      // markerOptions={{icon: tipTypeIcon(marker.type, marker.name), title: 'Default title'}}
      options={{ maxClusterRadius: 80 }}
      onMarkerClick={this.handleClick.bind(this)}
      radioMarker
    />
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
    // 人脸alarmid, 车辆没有alarmid,
    return (
      <Marker
        key={marker.alarmId ? marker.name:marker.plateInfo}
        position={[marker.lat, marker.lng]}
        onClick={setAlarmHistoryDetail.bind(this, marker)}
        icon={tipTypeIcon(marker.alarmId ? 6 : 7, marker.alarmId ? marker.name:marker.plateInfo)}
      />
    );
  }
  handleClick(opt) {
    if (opt.options.type === 1) return this.handleCarClick(opt.options.id);
    if (opt.options.type === 3) {
      const marker = opt.options.info
      L.popup({
        className: 'camera-marker-popup',
        // closeButton: false
      })
        .setLatLng([marker.lat, marker.lng])
        .setContent(`
        <div class="camera-info camerinfo-border">
          <div class="name">${marker.name}</div>
          <div class="desc">接警单编号 : ${marker.id || ''}</div>
          <div class="desc">姓名 : ${marker.policeman || ''}</div>
          <div class="desc">单位 : ${marker.jzdm || ''}</div>
          <div class="desc">警员编号 : ${marker.zjhm || ''}</div>
          <div class="desc">警员编号/车牌号:${marker.busnum1 || ''}</div>
          <div class="desc">电话号码 : ${marker.dhhm || ''}</div>
          <div class="desc">纬度 : ${marker.lat}</div>
          <div class="desc">经度 : ${marker.lng}</div>
        </div>
      `)
        .openOn(this.context);
    }
  }

  renderHeatLayer() {
    return <HeatMap />
  }

  // renderAllMarkers(markerList) {
  //   markerList.map(marker => {
  //     marker.options = {
  //       icon: tipTypeIcon(marker.type, marker.name),
  //       type: marker.type,
  //       id: marker.id,
  //       info: marker
  //     }
  //   })
  //   return (
  //     <MarkerCluster
  //       markers={markerList}
  //       wrapperOptions={{enableDefaultStyle: true}}
  //       // markerOptions={{icon: tipTypeIcon(marker.type, marker.name), title: 'Default title'}}
  //       options={{ maxClusterRadius: 80 }}
  //       onMarkerClick={this.handleClick.bind(this)}
  //     />
  //   )
  // }

  render() {
    const { 
      markers, alarmMarker, forceHistoryMarker, movePath, 
      iShowCarMarkers, iShowRadioMarkers, carMarkers, 
      radioMarkers, iShowHeatLayers
    } = this.props;
    // console.log(markers, forceHistoryMarker);
    if (movePath) return null;
    if (forceHistoryMarker && typeof forceHistoryMarker === 'object') {
      return this.renderSelectedMarker(forceHistoryMarker);
    }
    if (alarmMarker) {
      return this.renderAlarmMarker(alarmMarker);
    }
    return (
      <Fragment>
        {
          iShowCarMarkers && this.renderCarMarkers(carMarkers)
          // this.renderAllMarkers(markers)
        }
        {
          iShowRadioMarkers && this.renderRadioMarkers(radioMarkers)
        }

        {
          iShowHeatLayers && this.renderHeatLayer()
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeMarkers);


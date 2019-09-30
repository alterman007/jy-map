import React, { useContext } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { tipTypeIcon } from '../icons';
import { MapContext } from '../context';
// type = 1 签到点位, type = 2 巡逻点位
const mapStateToProps = (state) => {
  return {
    signInMarkers: state.map.signInMarkers
  }
}

const markerClick = (marker, context) => {
  L.popup({
    className: 'camera-marker-popup',
    // closeButton: false
  })
    .setLatLng([marker.lat, marker.lng])
    .setContent(`
    <div class="camera-info camerinfo-border">
      <div class="name">${marker.CJRXM}</div>
      <div class="desc">签到点 : ${marker.BDDMC}</div>
      <div class="desc">签到时间 : ${marker.qdtime}</div>
      <div class="desc">警员编号 : ${marker.CJRJH}</div>
      <div class="desc">机构代码 : ${marker.PCSBM}</div>
    </div>
  `)
    .openOn(context);
}

const SignInmarkers = ({ signInMarkers }) => {

  const context = useContext(MapContext);

  return (
    signInMarkers.map((m, index) => {
      return (
        <Marker
          key={m.CJRXM + index}
          position={[m.lat, m.lng]}
          onClick={() => markerClick(m, context)}
          icon={tipTypeIcon(m.type === "1" ? 9 : 0, m.CJRXM)}
          // onClick={this.handleCarClick.bind(this, car.id)}
        >
        </Marker>
      )
    })
  )
}

export default connect(mapStateToProps)(SignInmarkers);
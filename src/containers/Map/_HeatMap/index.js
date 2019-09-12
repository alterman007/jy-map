import React, { Component } from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { gradient } from './config';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    carMarkers: state.map.carMarkers,
    iShowHeatLayers: state.map.iShowHeatLayers
  }
}

const markers = [
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
  { lng: 121.368088, lat: 31.212068, wificount: 6, id: 1, name: "aaaa" },
]



class HeatMap extends Component {
  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 15,
    blur: 30,
    max: 3,
    limitAddressPoints: true,
  };

  random(num, max, min = 0) {
    return num + (Math.random() * (max - min) + min);
  }

  getWifiCount() {
    const res = [];
    this.props.carMarkers.map(car => {
    // markers.map(car => {
      const count = car.wificount;
      for (var i = 0; i < count; i++) {
        res.push([
          this.random(car.lat, 0.001, -0.001),
          this.random(car.lng, 0.001, -0.001),
          // 1
          parseInt(this.random(0, 1200, 0))
        ]);
      }
    });
    return res;
  }

  render() {
    const { iShowHeatLayers } = this.props;
    if(!iShowHeatLayers) {
      return null;
    }
    const heat = this.getWifiCount()
    return (
      <>
        <HeatmapLayer
          points={heat}
          // points={points}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          gradient={gradient}
          intensityExtractor={m => m[2]}
          radius={Number(this.state.radius)}
          blur={Number(this.state.blur)}
          max={Number.parseFloat(this.state.max)}
        />
      </>
    );
  }
}

export default connect(mapStateToProps)(HeatMap);
// export default HeatMap;


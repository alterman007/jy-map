import React, { Component } from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
// import points from './HeatData.json';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    carMarkers: state.map.carMarkers
  }
}


const gradient = {
  '1.00': '#e3000e',
  '0.99': '#e31006',
  '0.90': '#ed0400',
  '0.85': '#f08c16',
  '0.70': '#fefb00',
  '0.50': '#bbfe00',
  '0.00': '#02ff0e',
};


class HeatMap extends Component {

  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 18,
    blur: 18,
    max: 0.5,
    // max: 100,
    limitAddressPoints: true,
  };
  
  random(num, scope, flag) {
    if (flag) {
      return num + Math.random()*scope
    }
    return num - Math.random()*scope
  }

  getWifiCount() {
    const res = [];
    let flag = true;
    this.props.carMarkers.map(car => {
      const count = car.wificount < 10 ? 10 : car.wificount;
      for (var i = 0; i < count; i++) {
        res.push([this.random(car.lat, 0.001, flag), this.random(car.lng, 0.001, flag), parseInt(this.random(0, 1200, true))]);
        Math.random() > 0.5 ? flag = !flag : void (0);
      }
    })
    return res;
  }

  render() {
    const heat = this.getWifiCount();
    return (
      <HeatmapLayer
        points={heat}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        gradient={gradient}
        intensityExtractor={m => parseFloat(m[2])}
        radius={Number(this.state.radius)}
        blur={Number(this.state.blur)}
        max={Number.parseFloat(this.state.max)}
      />
    );
  }
}

export default connect(mapStateToProps)(HeatMap);
// export default HeatMap;


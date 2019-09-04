import React, { Component } from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import points from './HeatData.json';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
//   return {
//     carMarkers: state.map.carMarkers
//   }
// }

class HeatMap extends Component {

  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 18,
    blur: 18,
    max: 0.5,
    limitAddressPoints: true,
  };

  getWifiCount(count, lat, lng) {
    let res = []
    for(var i = 0;　i<count; i++) {
      console.log(count)
      res.push([lat, lng])
    }
    return res
  }

  render() {
    // let heat = this.props.carMarkers.map(h => {
    //   return this.getWifiCount(h.wificount, h.lat, h.lng)
    // })
    const gradient = {
      '1.00': '#e3000e',
      '0.99': '#e31006',
      '0.90': '#ed0400',
      '0.85': '#f08c16',
      '0.70': '#fefb00',
      '0.50': '#bbfe00',
      '0.00': '#02ff0e'
    };

    return (
      <HeatmapLayer
        points={points}
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

// export default connect(mapStateToProps)(HeatMap);
export default HeatMap;


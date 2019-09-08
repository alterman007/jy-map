import React, { Component } from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
// import points from './HeatData.json';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
//   return {
//     carMarkers: state.map.carMarkers
//   }
// }

const latlng = [[31.259523,121.302872], [31.218477, 121.426516]]
const points = [[31.259523,121.302872, 899],[31.256231,121.302872, 1359],[31.259321,121.302872, 2222],[31.260001,121.302872, 666],[31.261231,121.302872, 666],[31.261231,121.302872, 1279],]

// const points = []
class HeatMap extends Component {

  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 18,
    blur: 18,
    max: 0.1,
    // max: 100,
    limitAddressPoints: true,
    points: points
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        points: this.getWifiCount()
      })
    }, 2000);
  }
  random(num,scope) {
    return num + Math.random()*scope
  }

  getWifiCount( ) {
    // const { points } = this.state;
    
    const res = [];
    const count = 10;
    latlng.map(lan => {
      // lan[0]+= 0.005326
      // lan[1] += 0.0005326
      for (var i = 0; i < count; i++) {
        res.push([this.random(lan[0], 0.01), this.random(lan[1], 0.01), parseInt(this.random(0, 1200))])
      }
    })
    return res;
    console.log(res)
  }

  render() {
    // let heat = this.props.carMarkers.map(h => {
    //   return this.getWifiCount(h.wificount, h.lat, h.lng)
    // })
    const { points } = this.state

    const gradient = {
      '1.00': '#e3000e',
      '0.99': '#e31006',
      '0.90': '#ed0400',
      '0.85': '#f08c16',
      '0.70': '#fefb00',
      '0.50': '#bbfe00',
      '0.00': '#02ff0e',
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


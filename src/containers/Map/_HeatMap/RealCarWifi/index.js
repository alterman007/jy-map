import React from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { gradient, getWifiCount } from '../config';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    carMarkers: state.map.carMarkers,
    iShowHeatLayers: state.map.iShowHeatLayers
  }
}

class RealCarWifi extends React.PureComponent {
  state = {
    mapHidden: false,
    layerHidden: false,
    radius: 15,
    blur: 30,
    max: 3,
    limitAddressPoints: true,
  };
  render() {
    const { iShowHeatLayers, carMarkers } = this.props;
    if(!iShowHeatLayers) {
      return null;
    }
    const heat = getWifiCount(carMarkers);
    return (
      <>
        <HeatmapLayer
          points={heat}
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

export default connect(mapStateToProps)(RealCarWifi);


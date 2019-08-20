import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import areaData from './area.json';


class Path extends Component {
  geojsonStyle = {
    color: '#20AAFF',
    weight: 4,
    fillOpacity: 0.5,
    fillColor: '#20AAFF',
  };

  state = {
    areaData: turf.polygon([areaData]),
  }


  render() {
    const { areaData } = this.state;
    return (
      <GeoJSON
        data={turf.featureCollection([areaData])}
        style={this.geojsonStyle}
      />
    );
  }
}

export default Path;

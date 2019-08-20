import React, { Component, Fragment } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import areaData from './area.json';

const lineData = [
  [
    121.32313728332518,
    31.285225971149053
  ],
  [
    121.33747100830077,
    31.26255800928356
  ],
  [
    121.33060455322266,
    31.255807919878652
  ]
];
class Path extends Component {
  geojsonStyleArea = {
    color: '#20AAFF',
    weight: 4,
    fillOpacity: 0.5,
    fillColor: '#20AAFF',
  };

  geojsonStyleLine = {
    color: 'red',
    weight: 4,
  };

  render() {
    return (
      <Fragment>
        <GeoJSON
          data={turf.featureCollection([turf.polygon([areaData])])}
          style={this.geojsonStyleArea}
        />
        <GeoJSON
          data={turf.featureCollection([turf.lineString(lineData)])}
          style={this.geojsonStyleLine}
        />
      </Fragment>
    );
  }
}

export default Path;

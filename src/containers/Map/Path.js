import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';

const mapStateToProps = (state) => ({
  movePath: state.map.movePath,
});

class Path extends Component {
  geojsonStyle = {
    color: 'red',
    weight: 4,
    fillOpacity: 0.5,
    fillColor: 'red',
  };

  render() {
    const { movePath } = this.props;
    if (!movePath) {
      return null;
    }
    console.log(movePath);
    return (
      <GeoJSON
        data={turf.featureCollection([movePath])}
        style={this.geojsonStyle}
      />
    );
  }
}

export default connect(mapStateToProps)(Path);

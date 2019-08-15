import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import { MapContext } from './context';
import MoveMarker from './moveMarker';

const mapStateToProps = (state) => ({
  movePath: state.map.movePath,
});

class Path extends Component {
  static contextType = MapContext;

  geojsonStyle = {
    color: '#20AAFF',
    weight: 4,
    fillOpacity: 0.5,
    fillColor: '#20AAFF',
  };

  fitBounds() {
    const bounds = turf.getCoords(this.props.movePath)
      .map((d) => d.concat().reverse());
    this.context.fitBounds(bounds, { maxZoom: 16 });
  }

  moveMarkerAlongPath() {
    this.moveMarker = new MoveMarker(this.context, this.props.movePath);
  }

  destroyMoveMarker() {
    if (this.moveMarker) {
      this.moveMarker.destroy();
    }
  }

  componentDidUpdate() {
    this.destroyMoveMarker();
    const { movePath } = this.props;
    if (!movePath) {
      return;
    }
    this.fitBounds();
    this.moveMarkerAlongPath();
  }

  componentWillUnmount() {
    this.destroyMoveMarker();
  }

  render() {
    const { movePath } = this.props;
    if (!movePath) {
      return null;
    }
    return (
      <GeoJSON
        data={turf.featureCollection([movePath])}
        style={this.geojsonStyle}
      />
    );
  }
}

export default connect(mapStateToProps)(Path);

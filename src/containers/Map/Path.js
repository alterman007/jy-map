import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import { MapContext } from './context';
import { tipTypeIcon } from './icons';
import MoveMarker from './moveMarker';

const mapStateToProps = (state) => ({
  movePath: state.map.movePath,
  moveFlag: state.map.moveFlag,
  alarmDetail: state.map.showAlarmHistoryDetail,
  markerId: state.map.selectedMarkerID,
  markers: state.map.realTimeMarkers,
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
    this.context.fitBounds(bounds, { maxZoom: 16, padding: [150, 150] });
  }

  moveMarkerAlongPath() {
    const { markerId, markers } = this.props;
    const forceItem = typeof markerId === 'object' ? markerId : markers.find((marker) => marker.id === markerId);
    let icon;
    if (forceItem) {
      icon = tipTypeIcon(1, forceItem.name);
    }
    this.moveMarker = new MoveMarker(this.context, this.props.movePath, { icon });
  }

  destroyMoveMarker() {
    if (this.moveMarker) {
      this.moveMarker.destroy();
    }
  }

  componentDidUpdate() {
    this.destroyMoveMarker();
    const { movePath, moveFlag } = this.props;
    if (!movePath) {
      return;
    }
    this.fitBounds();
    if (moveFlag) {
      this.moveMarkerAlongPath();
    }
  }

  componentWillUnmount() {
    this.destroyMoveMarker();
  }

  render() {
    const { movePath, alarmDetail } = this.props;
    // console.log("movePath", movePath)
    if (!movePath) {
      return null;
    }
    if (alarmDetail) {
      this.geojsonStyle.color = '#F52323';
    } else {
      this.geojsonStyle.color = '#20AAFF';
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

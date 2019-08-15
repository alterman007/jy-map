import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import Path from './Path';
import CarMarkers from './CarMarkers';
import PeopleMarkers from './PeopleMarkers';

import './index.styl';

const mapStateToProps = (state) => ({
  center: state.map.center,
});

class MapOperation extends Component {
  state = {
    zoom: 13,
  };

  handleClick = (ev) => {
    console.log(ev.latlng);
  }

  renderTileLayer() {
    return (<Fragment>
      <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
    </Fragment>);
  }

  render() {
    const { center } = this.props;
    return (
      <Map
        className="map-wrapper"
        attributionControl={false}
        center={[center.lat, center.lng]}
        zoom={this.state.zoom}
        onClick={this.handleClick}
      >
        {this.renderTileLayer()}
        <CarMarkers />
        <PeopleMarkers />
        <Path />
      </Map>
    );
  }
}

export default connect(mapStateToProps)(MapOperation);

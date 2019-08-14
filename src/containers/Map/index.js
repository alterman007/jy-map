import React, { Component, Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { carIcon } from './icons';

import './index.styl';

class MapOperation extends Component {
  state = {
    lat: 30,
    lng: 120,
    zoom: 13,
  };

  renderTileLayer() {
    return <Fragment>
      <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
    </Fragment>
  }

  handleClick = (ev) => {
    console.log(ev.latlng);
  }

  renderCarMarker(position, plateNumber) {
    return (
      <Marker position={position} icon={carIcon}>
        <Popup className="car-marker-popup" closeButton={false}>
          {plateNumber}
        </Popup>
      </Marker>
    );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map 
        className="map-wrapper" 
        attributionControl={false} 
        center={position} 
        zoom={this.state.zoom}
        onClick={this.handleClick}
      >
        {this.renderTileLayer()}
        {this.renderCarMarker(position, '沪A32312')}
      </Map>
    );
  }
}

export default MapOperation;
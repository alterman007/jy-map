import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import { MapContext } from './context';
import Path from './Path';
import CarMarkers from './CarMarkers';
import PeopleMarkers from './PeopleMarkers';

import './index.styl';

const mapStateToProps = (state) => ({
  center: state.map.center,
});

class MapOperation extends Component {
  mapEle = createRef();
  state = {
    leafletEle: null,
    zoom: 13,
  };

  handleClick = (ev) => {
    console.log(ev.latlng);
  }

  componentDidMount() {
    this.setState({
      leafletMap: this.mapEle.current.leafletElement,
    });
  }

  renderTileLayer() {
    return (<Fragment>
      <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
    </Fragment>);
  }

  render() {
    const { center } = this.props;
    return (
      <MapContext.Provider value={this.state.leafletMap}>
        <Map
          className="map-wrapper"
          attributionControl={false}
          center={[center.lat, center.lng]}
          zoom={this.state.zoom}
          onClick={this.handleClick}
          zoomControl={false}
          ref={this.mapEle}
        >
          {this.renderTileLayer()}
          <CarMarkers />
          <PeopleMarkers />
          <Path />
        </Map>
      </MapContext.Provider>
    );
  }
}

export default connect(mapStateToProps)(MapOperation);

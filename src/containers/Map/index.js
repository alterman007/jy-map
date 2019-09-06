import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';
import { MapContext } from './context';
import Path from './Path';
import MonitorMarkers from './MonitorMarkers';
import RealTimeMarker from './RealTimeMarker';

import './index.styl';
import Area from './Area/index';
import HDPICModal from '../../components/HDPICModal';

const mapStateToProps = (state) => ({
  center: state.map.center,
});


let isUpdateZoom = false

class MapOperation extends Component {
  mapEle = createRef();
  state = {
    leafletEle: null,
    zoom: 13
  };

  handleClick = (ev) => {
    console.log(ev);
  }

  componentDidMount() {
    this.setState({
      leafletMap: this.mapEle.current.leafletElement,
    });
  }

  renderTileLayer() {
    return (
      <Fragment>
        <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
      </Fragment>
    );
  }

  // renderTileLayer() {
  //   return (
  //     <Fragment>
  //       <TileLayer url="http://15.75.0.255:25003/v3/tile?z={z}&y={y}&x={x}" />
  //       <TileLayer url="http://15.75.0.255:25033/v3/tile?z={z}&y={y}&x={x}" />
  //       <TileLayer url="http://15.75.0.255:25777/v3/tile?z={z}&y={y}&x={x}" />
  //     </Fragment>
  //   )
  // }

  render() {
    const { center } = this.props;
    return (
      <MapContext.Provider value={this.state.leafletMap}>
        <Map
          className="map-wrapper"
          attributionControl={false}
          center={[center.lat, center.lng]}
          zoom={this.state.zoom}
          zoomSnap={0}
          onClick={this.handleClick}
          zoomControl={false}
          ref={this.mapEle}
          maxZoom={18}
          minZoom={6}
          // onZoomEnd={this.onZoomEnd.bind(this)} //监听地图缩放级别
        >
          {this.renderTileLayer()}
          {/* <CarMarkers /> */}
          {/* <PeopleMarkers /> */}

          {/* <CarMarkers /> */}
          <Area />
          <MonitorMarkers />
          <RealTimeMarker />
          <Path />
          <HDPICModal />
        </Map>
      </MapContext.Provider>
    );
  }
}

export default connect(mapStateToProps)(MapOperation);

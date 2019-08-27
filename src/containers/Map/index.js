import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, TileLayer } from 'react-leaflet';
import { MapContext } from './context';
import Path from './Path';
import MonitorMarkers from './MonitorMarkers';
import { setMapZoom } from '../../actions/map';
// import Area from './Area';
// import CarMarkers from './CarMarkers';
// import PeopleMarkers from './PeopleMarkers';
import RealTimeMarker from './RealTimeMarker';

import './index.styl';
import Area from './Area';

const mapStateToProps = (state) => ({
  center: state.map.center,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setMapZoom
    }, dispatch)
  }
}

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

  // onZoomEnd(opt) {
  //   const { actions } = this.props
  //   if (opt.sourceTarget._animateToZoom === opt.sourceTarget.options.maxZoom && isUpdateZoom) {
  //     actions.setMapZoom(opt.sourceTarget._animateToZoom)
  //     isUpdateZoom = false
  //   } else if (opt.sourceTarget._animateToZoom <= opt.sourceTarget.options.maxZoom && !isUpdateZoom) {
  //     actions.setMapZoom(opt.sourceTarget._animateToZoom)
  //     isUpdateZoom = true
  //   }
  // }

  componentDidMount() {
    this.setState({
      leafletMap: this.mapEle.current.leafletElement,
    });
  }
  // renderTileLayer() {
  //   return (<Fragment>
  //     <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
  //   </Fragment>);
  // }
  renderTileLayer() {
    if (process.env.NODE_ENV === 'development') {
      return (
        <Fragment>
          <TileLayer url="//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}" />
        </Fragment>
      );
    }
    return (
    <Fragment>
        <TileLayer url="http://15.75.0.255:25003/v3/tile?z={z}&y={y}&x={x}" />
        <TileLayer url="http://15.75.0.255:25033/v3/tile?z={z}&y={y}&x={x}" />
        <TileLayer url="http://15.75.0.255:25777/v3/tile?z={z}&y={y}&x={x}" />
    </Fragment>
    )
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
          zoomSnap={0}
          onClick={this.handleClick}
          zoomControl={false}
          ref={this.mapEle}
          maxZoom={16}
          // onZoomEnd={this.onZoomEnd.bind(this)} //监听地图缩放级别
        >
          {this.renderTileLayer()}
          {/* <CarMarkers /> */}
          {/* <PeopleMarkers /> */}
          <Area />
          <MonitorMarkers />
          <RealTimeMarker />
          <Path />
        </Map>
      </MapContext.Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapOperation);

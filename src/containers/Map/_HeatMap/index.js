import React, { Component } from 'react';
import { connect } from 'react-redux';
import RealCarWifi from './RealCarWifi';
import BaseStationWifi from './BaseStationWifi';

const mapStateToProps = (state) => {
  return {
    iShowHeatLayers: state.map.iShowHeatLayers
  }
}

class HeatMap extends Component {
  render() {
    const { iShowHeatLayers } = this.props;
    if(!iShowHeatLayers) {
      return null;
    }
    return (
      <>
        <RealCarWifi />
        <BaseStationWifi />
      </>
    );
  }
}

export default connect(mapStateToProps)(HeatMap);

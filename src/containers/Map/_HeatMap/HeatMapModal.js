import React from 'react';
import './index.styl';
import { connect } from 'react-redux';
import { gradient, intensity } from './config';
const mapStateToProps = (state) => {
  return {
    iShowHeatLayers: state.map.iShowHeatLayers,
    carMarkers: state.map.carMarkers,
  }
}


const HeatMapModal = ({ iShowHeatLayers, carMarkers }) => {
  if (!iShowHeatLayers) {
    return null;
  }
  return (
    <div
      className="heat-map-layer-modal corner-border"
    >
      <div className="car-info">
        {
          carMarkers.map((car, index) => {
            return <h1 key={index}>{car.name}: wifi嗅探数 {car.wificount}个</h1>
          })
        }
      </div>
      <div className="color-desc">
        {
          Object.keys(gradient).map((ele, index) => {
            return <p key={ele}><b style={{ background: gradient[ele] }}></b><span>{intensity[index]}</span></p>
          })
        }
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(HeatMapModal);
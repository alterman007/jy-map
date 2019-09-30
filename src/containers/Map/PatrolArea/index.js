import React from 'react';
import { connect } from 'react-redux';
import { GeoJSON } from 'react-leaflet';
import * as turf from '@turf/turf';
import { getuuid } from '../../../utils/func';
import { message } from 'antd';
import SignInMarkers from './SignInMarkers';
import { transverse, longitudinal } from './demo';

// 巡逻区域;
const mapStateToProps = (state) => {
  return {
    iShowPatrolArea: state.map.iShowPatrolArea,
    patrolArea: state.map.patrolArea,
    cruiseLine: state.map.cruiseLine,
  }
}

const getstyle = (line, color) => {
  return line ? {
    color: color,
    weight: '6'
  } : {
    color: "rgb(253,243,124)",
    weight: 4,
    fillOpacity: 0.1,
    fillColor: '#2DEFFF'
  }
}
const PatrolArea = ({ iShowPatrolArea, patrolArea, cruiseLine }) => {
  if (!iShowPatrolArea) {
    return null;
  }
  return (
    <>
      <GeoJSON
        data={turf.featureCollection(patrolArea)}
        style={getstyle()}
        key={getuuid()}
      />
      {
        cruiseLine.length > 0 &&
        <GeoJSON
          data={turf.featureCollection([cruiseLine[1]])}
          style={getstyle('line')}
          key={getuuid()}
        />
      }
      <GeoJSON
        data={turf.featureCollection([turf.lineString(transverse)])}
        style={getstyle('line','red')}
      />
      <GeoJSON
        data={turf.featureCollection([turf.lineString(longitudinal)])}
        style={getstyle('line','green')}
      />
      <SignInMarkers />
    </>
  )
}

export default connect(mapStateToProps)(PatrolArea);
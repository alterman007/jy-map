import React, { useEffect, useState } from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import MarkerCluster from '../../MarkerCluster';
import { gradient, getWifiCount, refreshTime } from '../config';
import { getBaseStationWifi } from '../../../../request/api';
import { tipBaseStationWifiIcon } from '../../icons';
import { connect } from 'react-redux';

const radius = 15, blur = 30, max = 3;

const mapStateToProps = (state) => {
  return {
    iShowHeatLayers: state.map.iShowHeatLayers
  }
}

var timer = null;

const BaseStationWifi = ({ iShowHeatLayers }) => {
  let [state, setState] = useState({
    baseStationWifi: []
  })

  const getwifi = async () => {
    try {
      const { data } = await getBaseStationWifi()
      data.map(d => {
        d.SERVICE_NAME = d.SERVICE_NAME.replace(/\//g, '')
        d.options = {
          icon: tipBaseStationWifiIcon(d.SERVICE_NAME+`wifi:${d.num}个`)
        }
      })
      setState({
        baseStationWifi: data
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getwifi();
    clearInterval(timer);
    timer = setInterval(() => {
      getwifi()
    }, refreshTime);
    return () => {
      setState = () => {
        return null;
      }
      clearInterval(timer)
    }
  }, [iShowHeatLayers])

  const baseStationWifi = [{
    lng: 121.338219,
    lat: 31.281926,
    num: 1200
  }]
  return (
    <>
      <MarkerCluster
        markers={state.baseStationWifi}
        wrapperOptions={{ enableDefaultStyle: true }}
        // markerOptions={{ icon: tipMonitorIcon('Default title'), title: 'Default title' }}
        options={{ maxClusterRadius: 80 }}
        // onMarkerClick={this.handleClick}
      />
      <HeatmapLayer
        // points={getWifiCount(baseStationWifi)}
        points={getWifiCount(state.baseStationWifi)}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        gradient={gradient}
        intensityExtractor={m => m[2]}
        radius={Number(radius)}
        blur={Number(blur)}
        max={Number.parseFloat(max)}
      />
    </>
  )
}

export default connect(mapStateToProps)(BaseStationWifi);
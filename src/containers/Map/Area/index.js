import React from 'react';
import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import shRegion from './shanghai.json';
import sh from './sh1.json';
import { connect } from 'react-redux';
import { MapContext } from '../context';
import { bindActionCreators } from 'redux';
import { fetchMapPCSArea } from '../../../actions/map.js';
import PCSArea from './PCSArea';
let markerRecord = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fetchMapPCSArea: fetchMapPCSArea.startAction
    }, dispatch)
  }
}
class Area extends React.Component {
  state = {
    clickAreaName: "",
    pscbj: [],
  }
  static contextType = MapContext
  async handleClick(ev) {
    try {
      if(markerRecord) {
        this.context.removeLayer(markerRecord)
      }
      this.props.actions.fetchMapPCSArea(ev.sourceTarget.feature.properties.adcode+"000000");
      var myIcon = L.divIcon({
        className: `marker-with-tip areaIcon`,
        html: `<span class=areaIconName name>${ev.sourceTarget.feature.properties.name}</span>`,
        iconAnchor: [17, 20],
        iconSize: [44, 38],
        popupAnchor: [0, -20],
      });

      const position = [...ev.sourceTarget.feature.properties.centroid]
      markerRecord = L.marker(position.reverse(), {icon: myIcon}).addTo(this.context);
      this.context.flyTo(position, 12)
    } catch (error) {
      console.error("查询失败", error)
    }
  }
  setStyle(undef, region) {
    return {
      color: region ? 'transparent':'#13E2FF',
      weight: 2,
      fillOpacity:0,
      fillColor: 'transparent',   
      className: region ? '' : 'sh'
    }
  }
  render() {
    return (
      <>
        <GeoJSON
          data={shRegion}
          style={this.setStyle.bind(this, 'region')}
          onClick={this.handleClick.bind(this)}
        />
        <GeoJSON
          data={sh}
          style={this.setStyle}
        />
        <PCSArea
          isSelectedTheSameArea={this.state.isSelectedTheSameArea}
        />
      </>
    )
  }
}

export default connect(null, mapDispatchToProps)(Area);
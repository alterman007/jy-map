import React from 'react';
import {GeoJSON} from 'react-leaflet';
import * as turf from '@turf/turf';
import areaData from './area.json';
import shArea from './shanghai.json';
import coordtransform from 'coordtransform'
// const lineData1 = [[121.429098,31.223023],[121.429041,31.223051],[121.429868,31.223936],[121.430496,31.224421],[121.431922,31.224505],[121.434345,31.225788],[121.435514,31.225072],[121.4354,31.224644],[121.435514,31.223758],[121.435628,31.223215],[121.436055,31.221243],[121.436055,31.220558],[121.436312,31.220158],[121.436454,31.219557],[121.437196,31.218128],[121.438279,31.215898],[121.439248,31.214326],[121.439276,31.214069],[121.438991,31.213041],[121.438221,31.212185],[121.437537,31.211729],[121.436967,31.211415],[121.436197,31.211245],[121.434458,31.21119],[121.43309,31.214191],[121.433033,31.214191],[121.430153,31.22185],[121.429098,31.223023]]
// const lineData2 = [[121.427701,31.224138],[121.42907,31.223137],[121.42907,31.223137],[121.429127,31.223194],[121.429726,31.223736],[121.430325,31.224278],[121.431808,31.224562],[121.434203,31.225873],[121.435429,31.224958],[121.4354,31.224158],[121.436169,31.220558],[121.434117,31.220417],[121.432976,31.220076],[121.431037,31.219478],[121.430381,31.219022],[121.429126,31.218738],[121.428385,31.218738],[121.42539,31.218969],[121.421852,31.218943],[121.421681,31.219086],[121.42171,31.219058],[121.421596,31.219201],[121.421796,31.219401],[121.423964,31.220484],
// [121.424677,31.221141],[121.427701,31.224138]]
// const lineData3 = [[121.427701,31.224138],[121.42907,31.223137],[121.42907,31.223137],[121.429127,31.223194],[121.429726,31.223736],[121.430325,31.224278],[121.431808,31.224562],[121.434203,31.225873],[121.435429,31.224958],[121.4354,31.224158],[121.436169,31.220558],[121.434117,31.220417],[121.432976,31.220076],[121.431037,31.219478],[121.430381,31.219022],[121.429126,31.218738],[121.428385,31.218738],[121.42539,31.218969],[121.421852,31.218943],[121.421681,31.219086],[121.42171,31.219058],[121.421596,31.219201],[121.421796,31.219401],[121.423964,31.220484],
// [121.424677,31.221141],[121.427701,31.224138]]
// const lineData4 = [[121.427872,31.224109],[121.430182,31.221679]]
// const data = areaData.map(item => {
//     return coordtransform.wgs84togcj02(item[0], item[1])
// })
// const sh = shArea.features.map(area => {
//   area.coordinates
// })
class Area extends React.Component {
    state = {
      // area: turf.polygon([data], { name: "江苏路" }),
      clickAreaName: ""
    }
  handleClick(ev) {
    this.setState({
      clickAreaName: ev.sourceTarget.feature.properties.name === this.state.clickAreaName ? '' : ev.sourceTarget.feature.properties.name
    })
  }
  render() {
    const { area } = this.state;
        return (
            <div>
                <GeoJSON
              // data={turf.featureCollection([area])}
              data={shArea}
              // style={this.getStyle(false)}
              style={(f) => {
                return {
                  color: f.properties.name === this.state.clickAreaName ? 'red':'transparent',
                  weight: 4,
                  // fillOpacity: 0.5,
                  fillOpacity: f.properties.name === this.state.clickAreaName ? 0.5:0,
                  fillColor: 'yellow',
                }
              }}
              onClick={this.handleClick.bind(this)}
            />
                {/* <GeoJSON
                data={turf.featureCollection([turf.lineString(lineData1), turf.lineString(lineData2),turf.lineString(lineData3), turf.lineString(lineData4)])}
                tyle={this.getStyle(true)}
            />
                <GeoJSON
                data={turf.featureCollection([turf.lineString(lineData4)])}
                style={this.getStyle(true, "blue")}
            /> */}
            </div>
        )
    }
}

export default Area;
import React, { Component, Fragment } from 'react';
import { getMonitorList, monitorPlay } from '../../request/api';
import { Marker, Tooltip } from 'react-leaflet';
import { tipMonitorIcon } from './icons';

class MonitorMarkers extends Component {
  monitorEle = React.createRef()
    state = {
        monitorList: []
    }
  componentDidMount() {
    this.getMonitorList()
  }
  async getMonitorList() {
    try {
      const { data } = await getMonitorList();
      this.setState({
        monitorList: data
      })
    } catch (error) {
      console.error(error)
    }
  }
  handleClick(m = {}) {
    monitorPlay(m.indexCode)
  }
  render() {
    const { monitorList } = this.state;
    return (
      <Fragment>
        {
          monitorList.map((m, index) => (
            <Marker
            key={index}
            // position={[m.latitude, m.longitude]}
            position={[m.lat, m.lng]}
            icon={tipMonitorIcon(m.name)}
            onClick={this.handleClick.bind(this,m)}
            >
              <Tooltip className="destination-tooltip" direction="right">
                {m.name}
              </Tooltip>
            </Marker>
          ))
        }
        <iframe width="0" height="0" title="iframe" id="exe" ref={this.monitorEle}></iframe>
      </Fragment>
    );
  }
}

export default MonitorMarkers;

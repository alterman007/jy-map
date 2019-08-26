import React, { Component, Fragment } from 'react';
import { getMonitorList, monitorPlay } from '../../request/api';
// import { Marker, Tooltip } from 'react-leaflet';
import { tipMonitorIcon } from './icons';
import MarkerCluster from './MarkerCluster';

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
    monitorPlay(m.index_code)
  }
  render() {
    const { monitorList } = this.state;
    console.log(monitorList);
    return (
      <Fragment>
        <MarkerCluster
          markers={monitorList}
          wrapperOptions={{enableDefaultStyle: true}}
          markerOptions={{icon: tipMonitorIcon('Default title'), title: 'Default title'}}
          options={{ maxClusterRadius: 80 }}
        />
        <iframe width="0" height="0" title="iframe" id="exe" ref={this.monitorEle}></iframe>
      </Fragment>
    );
  }
}

export default MonitorMarkers;

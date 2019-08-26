import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMonitorList, monitorPlay } from '../../request/api';
import { Marker, Tooltip } from 'react-leaflet';
import { tipMonitorIcon } from './icons';
import { MapContext } from './context';
import MarkerCluster from './MarkerCluster';

const mapStateToProps = (state) => {
  return {
    mapzoom: state.map.mapzoom
  }
}

class MonitorMarkers extends Component {
  static contextType = MapContext;
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
      data.map(marker => {
        marker.options = {
          indexCode: marker.indexCode,
          icon: tipMonitorIcon(marker.name)
        }
      })
      this.setState({
        monitorList: data
      })
    } catch (error) {
      console.error(error)
    }
  }
  handleClick(opt = {}) {
    console.log("monitorIndexCode",opt.options.indexCode)
    monitorPlay(opt.options.indexCode)
  }
  render() {
    const { monitorList } = this.state;
    return (
      <Fragment>
        {
          this.props.mapzoom === this.context.options.maxZoom ? monitorList.map((marker, index) => {
            return <Marker
            key={marker.name + index}
            position={[marker.lat, marker.lng]}
            onClick={this.handleClick.bind(this, marker.id)}
            icon={tipMonitorIcon()}
          />
          }) : <MarkerCluster
          markers={monitorList}
          wrapperOptions={{enableDefaultStyle: true}}
          markerOptions={{icon: tipMonitorIcon('Default title'), title: 'Default title'}}
          options={{ maxClusterRadius: 80 }}
          onMarkerClick={this.handleClick}
        />
        }
        <iframe width="0" height="0" title="iframe" id="exe" ref={this.monitorEle}></iframe>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(MonitorMarkers);

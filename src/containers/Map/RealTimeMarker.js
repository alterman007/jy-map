
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import {
  selectRealTimeMarker,
} from '../../actions/map';
import { tipTypeIcon } from './icons';

const mapStateToProps = (state) => ({
  markers: state.map.realTimeMarkers,
  forceHistoryMarker: state.map.forceHistoryMarker,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectRealTimeMarker,
  }, dispatch),
});

class RealTimeMarkers extends Component {
  handleCarClick(marker) {
    console.log('handleCarClick', marker);
    const { actions } = this.props;
    actions.selectRealTimeMarker(marker);
  }
  renderCameraMarker(marker, index) {
    return (
      <Marker key={marker.name + index} position={[marker.lat, marker.lng]} icon={tipTypeIcon(marker.type, marker.name)}>
        <Popup className="camera-marker-popup" direction="right" closeButton={false}>
          <div className="camera-info corner-border">
            <div className="name">{marker.name}</div>
            <div className="desc">联网电台：江桥镇一分局</div>
            <div className="desc">联网电台：江桥镇一分局</div>
            <div className="desc">联网电台：江桥镇一分局</div>
            <div className="desc">联网电台：江桥镇一分局</div>
          </div>
        </Popup>
      </Marker>
    );
  }

  renderCarMarker(marker, index) {
    return (
      <Marker
        key={marker.name + index}
        position={[marker.lat, marker.lng]}
        onClick={this.handleCarClick.bind(this, marker.id)}
        icon={tipTypeIcon(marker.type, marker.name)}
      />
    );
  }

  renderWifiMarker(marker, index) {
    return (
      <Marker
        key={marker.name + index}
        position={[marker.lat, marker.lng]}
        icon={tipTypeIcon(marker.type, marker.name)}
      />
    );
  }

  renderPeopleMarker(marker, index) {
    return (
      <Marker key={marker.name + index} position={[marker.lat, marker.lng]} icon={tipTypeIcon(marker.type, marker.name)}>
        <Tooltip className="destination-tooltip" direction="right">
          {marker.name}
        </Tooltip>
      </Marker>
    );
  }

  renderSelectedMarker(marker) {
    console.log(marker);
    return (
      <Marker
        key={marker.name}
        position={[marker.lat, marker.lng]}
        onClick={this.handleCarClick.bind(this, marker)}
        icon={tipTypeIcon(1, marker.name)}
      />
    );
  }

  render() {
    const { markers, forceHistoryMarker } = this.props;
    // console.log(markers, forceHistoryMarker);
    if (forceHistoryMarker && typeof forceHistoryMarker === 'object') {
      return this.renderSelectedMarker(forceHistoryMarker);
    }

    return (
      <Fragment>
        {
          markers.map((marker, index) => {
            switch (marker.type) {
              case 1: // car
                return this.renderCarMarker(marker, index);
              case 2: // people
                return this.renderPeopleMarker(marker, index);
              case 3: // wifi
                return this.renderWifiMarker(marker, index);
              case 4: // camera
                return this.renderCameraMarker(marker, index);
              default:
                return <div>unknown</div>
            }
          })
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeMarkers);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForceDetail from '../ForceDetail';

const mapStateToProps = (state) => ({
  markerId: state.map.selectedMarkerID,
  markers: state.map.realTimeMarkers,
});

class ForceDetailControl extends Component {
  render() {
    const { markerId, markers } = this.props;
    const selectMarker = markers.find((marker) => marker.id === markerId);
    // console.log(selectMarker);
    if (selectMarker) {
      return <ForceDetail key={selectMarker.id} detail={selectMarker} />
    }
    return null;
  }
}

export default connect(mapStateToProps)(ForceDetailControl);

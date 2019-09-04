import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForceDetail from '../ForceDetail';

const mapStateToProps = (state) => ({
  markerId: state.map.selectedMarkerID,
  markers: state.map.carMarkers,
});

class ForceDetailControl extends Component {
  render() {
    const { markerId, markers } = this.props;
    const selectedItem = typeof markerId === 'object' ? markerId : markers.find((marker) => marker.id === markerId);
    // const selectedItem = markerId
    // console.log(selectMarker);
    if (selectedItem) {
      return <ForceDetail key={selectedItem.id} detail={selectedItem} />
    }
    return null;
  }
}

export default connect(mapStateToProps)(ForceDetailControl);

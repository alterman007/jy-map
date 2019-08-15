import React, { Component, Fragment } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Popup } from 'react-leaflet';
import { carIcon } from './icons';

const mapStateToProps = (state) => ({
  carPoints: state.map.carPoints,
});

class CarMarker extends Component {
  render() {
    const { carPoints } = this.props;
    return (
      <Fragment>
        {
          carPoints.map((car, index) => (
            <Marker key={car.name + index} position={[car.lat, car.lng]} icon={carIcon}>
              <Popup className="default-marker-popup" closeButton={false}>
                {car.name}
              </Popup>
            </Marker>
          ))
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(CarMarker);

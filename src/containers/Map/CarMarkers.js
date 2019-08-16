import React, { Component, Fragment } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Tooltip } from 'react-leaflet';
import { tipCarIcon } from './icons';

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
            <Marker key={car.name + index} position={[car.lat, car.lng]} icon={tipCarIcon(car.name)}>
              <Tooltip className="destination-tooltip" direction="right">
                {car.name}
              </Tooltip>
            </Marker>
          ))
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(CarMarker);

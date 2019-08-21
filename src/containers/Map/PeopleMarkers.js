import React, { Component, Fragment } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker, Popup } from 'react-leaflet';
import { peopleIcon } from './icons';

const mapStateToProps = (state) => ({
  peoplePoints: state.map.peoplePoints,
});

class CarMarker extends Component {
  render() {
    const { peoplePoints } = this.props;
    return (
      <Fragment>
        {
          peoplePoints.map((car, index) => (
            <Marker key={car.name + index} position={[car.lat, car.lng]} icon={peopleIcon}>
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

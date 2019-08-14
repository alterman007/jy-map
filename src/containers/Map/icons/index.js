import L from 'leaflet'
import carImage from './car.png';
// import peopleImage from './people.png';

export const carIcon = new L.Icon({
  iconUrl: carImage,
  // iconRetinaUrl: require('../assets/pointerIcon.svg'),
  iconAnchor: [24, 0],
  iconSize: [48, 38],
});


// export const suitcasePoint = new L.Icon({
//   iconUrl: peopleImage,
//   // iconRetinaUrl: require('../assets/suitcaseIcon.svg'),
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -35],
//   iconSize: [40, 40],
//   shadowUrl: '../assets/marker-shadow.png',
//   shadowSize: [29, 40],
//   shadowAnchor: [7, 40],
// })
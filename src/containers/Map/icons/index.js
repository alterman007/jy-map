import L from 'leaflet'
import carImage from './car.png';
import peopleImage from './people.png';
import moveImage from './move.png';

import './index.styl';

export const carIcon = new L.Icon({
  iconUrl: carImage,
  iconAnchor: [24, 19],
  iconSize: [48, 38],
  popupAnchor: [0, -19],
});

export const peopleIcon = new L.Icon({
  iconUrl: peopleImage,
  iconAnchor: [17, 20],
  iconSize: [34, 40],
  popupAnchor: [0, -20],
});

export const moveIcon = new L.Icon({
  iconUrl: moveImage,
  iconAnchor: [17, 51],
  iconSize: [34, 51],
});

export function tipCarIcon(desc) {
  return new L.DivIcon({
    className: 'car-marker-with-tip',
    html: `<span class="name">${desc}</span>`,
    iconAnchor: [24, 19],
    iconSize: [48, 38],
    popupAnchor: [0, -19],
    tooltipAnchor: [24, 0],
  });
}

// export const suitcasePoint = new L.Icon({
//   iconUrl: 'marker-icon.png',
//   iconRetinaUrl: 'marker-icon-2x.png',
//   shadowUrl: 'marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// })

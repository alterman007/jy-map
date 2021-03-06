import L from 'leaflet'
import carImage from './car.png';
import peopleImage from './people.png';
import cameraImage from './camera.png';
import wifiImage from './wifi.png';
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
// car 1 车辆 2 单兵 3 wifi 4 电台
// people
// wifi
// camera
const mapTypeToName = {
  1: 'car',
  2: 'people',
  3: 'wifi',
  4: 'camera',
}
const tipMarkerConfig = {
  car: {
    iconUrl: carImage,
    iconAnchor: [24, 19],
    iconSize: [48, 38],
    popupAnchor: [0, -19],
  },
  people: {
    iconUrl: peopleImage,
    iconAnchor: [17, 20],
    iconSize: [34, 40],
    popupAnchor: [0, -20],
  },
  camera: {
    iconUrl: cameraImage,
    iconAnchor: [15, 16],
    iconSize: [30, 32],
    popupAnchor: [0, -16],
  },
  wifi: {
    iconUrl: wifiImage,
    iconAnchor: [19, 19],
    iconSize: [38, 38],
    popupAnchor: [0, -19],
  },
};

export function tipTypeIcon(type, name) {
  const typeName = mapTypeToName[type];
  return new L.DivIcon(Object.assign({}, tipMarkerConfig[typeName], {
    className: `marker-with-tip ${typeName}`,
    html: `<span class="name">${name}</span>`,
  }));
}

export function tipCarIcon(desc) {
  return new L.DivIcon({
    className: 'marker-with-tip',
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

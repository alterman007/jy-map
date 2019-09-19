const gradient = {
  // '1.00': '#e3000e',
  // '0.99': '#e31006',
  // '0.90': '#ed0400',
  // '0.85': '#f08c16',
  // '0.70': '#fefb00',
  // '0.50': '#bbfe00',
  // '0.00': '#02ff0e',
  // // '0.2': 'white',
  // // '0.4': 'green',
  '0.1': '#bbfe00',
  '0.5': '#fefb00',
  '0.8': '#e3000e'
};

const refreshTime = 660000;

const intensity = ["0-3", "3-6", "6-10"];

const random = (num, max, min = 0) => {
  return num + (Math.random() * (max - min) + min);
}

const getWifiCount = (markers) => {
  const res = [];
  markers.map(m => {
    const count = m.wificount || m.num;
    for (var i = 0; i < count; i++) {
      res.push([
        random(m.lat, 0.001, -0.001),
        random(m.lng, 0.001, -0.001),
        // 1
        parseInt(random(0, 1200, 0))
      ]);
    }
  });
  return res;
}

export { gradient,intensity, getWifiCount, refreshTime }
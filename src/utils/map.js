import * as turf from '@turf/turf';
import coordtransform from 'coordtransform';

export function convertDataToGeojson(data, type) {
  const decodeData = data.map((p) => coordtransform.wgs84togcj02(...p))
  return turf[type](decodeData);
}

export function transformPolygon(pscbj) {
  return pscbj.map(pcs => {
    return turf.polygon([pcs.list], {
      name: pcs.dm,
      center: pcs.center
    })
  })
}

export function getKey(data, path) {
  if(!path) {
    return data;
  }
  const names = path.split(".");
  return names.reduce((pre, cur) => {
    return pre[cur] || {};
  }, data);
}

export function transformLatLng(config = {}) {
  const { path='', lngName='lng', latName='lat' } = config;
  function coverTarge(item) {
    const [lng, lat] = coordtransform.wgs84togcj02(item[lngName], item[latName]);
    item.lng = lng
    item.lat = lat;
    return item;
  }
  return (data) => {
    const target = getKey(data, path);
    Array.isArray(target) ? target.forEach(coverTarge) : coverTarge(target);
    return data;
  }
}

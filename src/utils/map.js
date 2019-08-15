import * as turf from '@turf/turf';

export function convertDataToGeojson(data, type) {
  return turf[type](data);
}

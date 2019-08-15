import * as turf from '@turf/turf';
import coordtransform from 'coordtransform';

export function convertDataToGeojson(data, type) {
  const decodeData = data.map((p) => coordtransform.wgs84togcj02(...p))
  return turf[type](decodeData);
}

import React, { useEffect, useContext } from 'react';
import data from './highlighted';
import * as turf from '@turf/turf';
import { GeoJSON, Marker, Tooltip } from 'react-leaflet';
import { transformPolygon } from '@/utils/map';
import { tipTypeIcon } from '../icons';
import { MapContext } from '../context';
const d = transformPolygon(data)

function useHighLightedAreaEffect() {
  const context = useContext(MapContext);
  const getstyle = () => {
    return {
      color: "rgb(253,243,124)",
      weight: 4,
      fillOpacity: 0.1,
      fillColor: '#2DEFFF'
    }
  }
  const handleClick = (f) => {
    context.flyTo(f.latlng, 14)
  }

  return [getstyle, handleClick]
}

const HighLightedArea = () => {
  const [getstyle, handleClick] = useHighLightedAreaEffect();
  console.log("渲染")
  return (
    <>
      <GeoJSON
        data={turf.featureCollection(d)}
        style={getstyle}
      />
      {
        d.map(m => {
          return (
            <Marker
              onClick={handleClick}
              key={m.properties.name}
              position={m.properties.center.reverse()}
              icon={tipTypeIcon(8, m.properties.name)}
            >
            </Marker>
         )
       })
      }
    </>
    // <>
    // </>
  )
}

export default HighLightedArea;
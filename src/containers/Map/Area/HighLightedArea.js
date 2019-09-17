import React, { useContext } from 'react';
import data from './highlighted';
import * as turf from '@turf/turf';
import { GeoJSON, Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { transformPolygon } from '@/utils/map';
import { tipTypeIcon } from '../icons';
import { MapContext } from '../context';
import { getxlxl, getzhuxl, getgddqd } from '@/request/api';
import { bindActionCreators } from 'redux';
import { setPatrolAreaData } from '../../../actions/map';
const d = transformPolygon(data);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setPatrolAreaData
    }, dispatch)
  }
}

function useHighLightedAreaEffect(actions) {
  const context = useContext(MapContext);
  const getstyle = () => {
    return {
      color: "rgb(253,243,124)",
      weight: 4,
      fillOpacity: 0.1,
      fillColor: '#2DEFFF'
    }
  }
  const handleClick = async (f, dm) => {
    context.flyTo(f.latlng, 14);
    const data = await Promise.all([getxlxl(dm), getzhuxl(dm), getgddqd(dm)]);
    actions.setPatrolAreaData({
      patrolArea: data[0],
      cruiseLine: data[1],
      signInMarkers: data[2]
    })
  }

  return [getstyle, handleClick]
}

const HighLightedArea = ({actions}) => {
  const [getstyle, handleClick] = useHighLightedAreaEffect(actions);
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
              onClick={(marker) => handleClick(marker, m.properties.dm)}
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

export default connect(null, mapDispatchToProps)(HighLightedArea);
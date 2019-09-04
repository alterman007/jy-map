import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { MapContext } from '../context';
import * as turf from '@turf/turf';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMapPCSArea } from '../../../actions/map';
const mapStateToProps = (state) => {
    return {
        pcsArea: state.map.pcsArea
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            setMapPCSArea,
        }, dispatch)
    }
}
class PCSArea extends React.Component {
    static contextType = MapContext
    state = {
        selectName: ""
    }
    constructor() {
        super()
    }
    getStyle(ev) {
        return {
            color: "#13E2FF",
            weight: 2,
            fillOpacity: 0.1,
            fillColor: '#2DEFFF'
          }
    }
    handleClick(ev) {
        this.props.actions.setMapPCSArea([]);
    }
    render() {
        const { pcsArea } = this.props
        const data = turf.featureCollection(pcsArea)
        return (
            <>
             <GeoJSON
                data={data}
                onClick={this.handleClick.bind(this)}
                key={data.features.length}
                style={this.getStyle.bind(this)}
                >
            </GeoJSON>
            </>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PCSArea);
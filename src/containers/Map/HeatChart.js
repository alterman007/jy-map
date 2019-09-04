import React from 'react';
import L from 'leaflet';
class HeatChart extends React.PureComponent{
    renderHeatLayer() {
        console.log("HeatChart", L.heatLayer)
    }
    render() {
        return (
            <>
            {
                this.renderHeatLayer()
            }
            </>
        )
    }
}

export default HeatChart;
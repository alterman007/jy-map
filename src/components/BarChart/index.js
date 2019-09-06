import React, { useEffect } from 'react';
import echarts from 'echarts';
import { getOption } from './config';

function useBarChartEffect() {
  const createChart = (ele, data) => {
    const myChart = echarts.init(ele);
    myChart.setOption(getOption(data))
  }
  return [createChart]
}


const BarChart = ({data}) => {
  const [createChart] = useBarChartEffect();
  const barchart = React.useRef();
  
  useEffect(() => {
    createChart(barchart.current, data)
  }, [])

  return (
    <div ref={barchart} style={{height: 600}}></div>
  )
}

export default BarChart;
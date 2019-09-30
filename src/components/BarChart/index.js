import React, { useEffect, useMemo } from 'react';
import echarts from 'echarts';
import { getOption } from './config';


// class BarChart extends React.Component {
//   barchart = React.createRef();

//   shouldComponentUpdate(a,b) {
//     console.log(a, b)
//   }

//   componentDidMount() {
//     const mychart = echarts.init(this.barchart.current);
//     mychart.setOption(getOption(this.props.data));
//   }

//   render() {
//     return (
//       <div ref={this.barchart} style={{height: 600}}></div>
//     )
//   }
// }

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
  }, []);

  return (
    <>
      <div ref={barchart} style={{height: 600}}></div> 
      </>
  )
}


export default BarChart;
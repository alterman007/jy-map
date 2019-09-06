import React from 'react';
import echarts from 'echarts';
import { getOption } from './config';
class TodayStatisics extends React.PureComponent {

  columnarChart = React.createRef();
  
  componentDidMount() {
    this.createChart()
  }
  
  createChart() {
    const { total, deal } = this.props;
    var mychart = echarts.init(this.columnarChart.current);
    mychart.setOption(getOption(total, deal))
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div ref={this.columnarChart} style={{height: "100px"}}>

        </div>
      </div>
    )
  }
}

TodayStatisics.defaultProps = {
  title: "全市警情统计"
}

export default TodayStatisics;
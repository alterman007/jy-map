import React from 'react';
import moment from 'moment';
import echarts from 'echarts';
class PieChart extends React.Component {
  pieChart = React.createRef()

  componentDidMount() {
    this.createPieChart()
  }
  createPieChart() {
    var mychart = echarts.init(this.pieChart.current);
    mychart.setOption({title : {
      // text: '今日警情统计',
      subtext: `${moment().format('YYYY MM DD')}`,
      x: 'center',
      textStyle: {
        color: 'white'
      },
      subtextStyle: {
        color: 'white'
      },
      y: 'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  // legend: {
  //     // orient: 'vertical',
  //     // top:'bottom',
  //   // left: 'left',
  //   // right: '20px',
  //   // textStyle: {
  //   //     color: 'white'
  //   //   },
  //   // data: this.props.data.map(e => {
  //   //   console.log(e)
  //   //     return e.dwmc
  //   // })
  // },
  series : [
      {
          name: '分局警情统计',
          type: 'pie',
          radius: ['29%', '59%'],
          center: ['50%', '40%'],
          label:{
              show:true,
              formatter:'{b}: {d}%',
            // formatter: (fj) => {
            //   return `${fj.data.name}: ${fj.data.value}起`
            // }
          },
      data: this.props.data.map(e => {
        return {value: e['count(*)'], name: e.dwmc}
      }),
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
      }
      }
  ]})
  }

  render() {
    return (
      <div>
        <h2>今日警情分布</h2>
        <div ref={this.pieChart} style={{width: '100%', height: '600px'}}>

        </div>
      </div>
    )
  }
}

export default PieChart;
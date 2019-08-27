import React from 'react';
import echarts from 'echarts';

class TodayStatisics extends React.PureComponent {
  columnarChart = React.createRef();
  
  componentDidMount() {
    this.createChart()
  }
  
  createChart() {
    const { data } = this.props;
    let info = 0; // 计算警情总数
    let alarm = 1100; // 告警 暂无数据
    data.map(d => {
      info += d['count(*)']
    })
    let all = alarm + info
    console.log()
    var mychart = echarts.init(this.columnarChart.current);
    var option = {
      tooltip: {
          trigger: 'item',
          formatter: function(params) {
              var res = params.name;
              var myseries = option.series;
              for (var i = 0; i < myseries.length; i++) {
                  res += myseries[i].name + ' : ' + myseries[i].data[0] + '%</br>';
              }
              return res;
          }
      },
      xAxis: {
          type: 'value',
          show: false,
      },
      yAxis: {
          type: 'category',
          show: false,
          axisTick: {
              show: false
          }
      },
      series: [{
          type: 'bar',
          name: '今日告警',
          data: [Math.round(alarm/all*100)],
          stack: 'income',
          barWidth: 30,
          label: {
              normal: {
                show: true,
                position: 'inside',
                // formatter: '{a}\n{c}%',
                formatter: (f) => {
                  return '今日告警' + alarm
                },
              color: 'white',
                fontSize: 20
              }
          },
          itemStyle: {
              normal: {
                  color: '#1f66f8',
                  // barBorderRadius: [5, 0, 0, 5],
              }
          },
      },{
          type: 'bar',
          name: '今日警情',
          data: [Math.round(info/all*100)],
          stack: 'income',
          barWidth: 30,
          label: {
              normal: {
                show: true,
                position: 'inside',
                // offset: [-40, -40],
                // formatter: '{a}\n{c}%',
              formatter: (f) => {
                  return '今日警情' + info
                },
              color: 'white',
              fontSize: 20
              }
          },
          itemStyle: {
              normal: {
                color: 'red',
                barBorderRadius: [0, 5, 5, 0],
              }
  
          }
      }]
    };
    mychart.setOption(option)
  }

  render() {
    return (
      <div>
        <h2>今日警情统计</h2>
        <div ref={this.columnarChart} style={{height: "100px"}}>

        </div>
      </div>
    )
  }
}

export default TodayStatisics;
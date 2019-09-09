export const getOption = (total, deal) => {
  var option = {
    grid: {
      left: '5%',
      top: '12%',
      right: '0%',
      bottom: '8%',
      containLabel: true
    },
    legend: {
      // x: '%',
      top: '5%',
      bottom: '5%',
      textStyle: {
        color: '#90979c',
        fontSize: 20,
      },
      "data": ['出警', '警情']
    },
    xAxis: [{
      show: false,
    }],
    yAxis: [{
      show: false,
      axisTick: 'none',
      axisLine: 'none',
      // offset: '27',
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 20,
        }
      },
      data: [deal]
    }, {
      show: false,
      axisTick: 'none',
      axisLine: 'none',
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: 20,
        }
      },
      data: [total]
      }, {
        show: false,
      axisLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0)'
        }
      },
      data: [],
    }],
    series: [{
      name: '出警',
      type: 'bar',
      stack: '圆',
      yAxisIndex: 0,
      data: [deal],
      label: {
        normal: {
          show: true,
          position: 'inside',
          distance: 10,
          textStyle: {
            color: '#ffffff',
            fontSize: 20,
          }
        }
      },
      barWidth: 20,
      itemStyle: {
        normal: {
          color: '#58BCB6',
          barBorderRadius: 5
        }
      },
      z: 2
    }, {
      name: '警情',
      type: 'bar',
      yAxisIndex: 1,
      barGap: '-100%',
      data: [total],
      barWidth: 20,
      label: {
        normal: {
          show: true,
          position: 'insideRight',
          distance: 10,
          textStyle: {
            color: 'black',
            fontSize: 20,
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#F9E559',
          barBorderRadius: 5,
        }
      },
      z: 1
    }]
  };
  return option;
}
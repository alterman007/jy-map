export const getOption = (data) => {
  const filterData = (key) => {
    return data.list.map(d => {
      return d[key]
    })
  }
  var option = {
    backgroundColor: "transparent",
    "title": {
      // "text": "杨浦分局警情统计",
      // "subtext": "BY Wang Dingding",
      x: "4%",
      textStyle: {
        color: '#fff',
        fontSize: 20
      },
      subtextStyle: {
        color: '#90979c',
        fontSize: 20,

      },
    },
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "type": "shadow",
       
      },
      textStyle: {
        color: "#fff",
        fontSize: 20
      }
    },
    "grid": {
      "borderWidth": 0,
      "top": 110,
      "bottom": 95,
      textStyle: {
        color: "#fff"
      }
    },
    "legend": {
      x: '4%',
      top: '11%',
      textStyle: {
        "color": '#90979c',
        "fontSize": 20,
      },
      "data": ['出警', '警情']
    },


    "calculable": true,
    "xAxis": [{
      "type": "category",
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        }
      },
      "splitLine": {
        "show": false
      },
      "axisTick": {
        "show": false
      },
      "splitArea": {
        "show": false
      },
      "axisLabel": {
        "interval": 0,
        fontSize: 20,
        rotate: 30
      },
      "data": filterData("name"),
    }],
    "yAxis": [{
      "type": "value",
      "splitLine": {
        "show": false
      },
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        },
      },
      "axisTick": {
        "show": false
      },
      "axisLabel": {
        "interval": 0,
        fontSize: 20,
      },
      "splitArea": {
        "show": false
      },

    }],
    "dataZoom": [{
      "show": true,
      "height": 30,
      "xAxisIndex": [
        0
      ],
      bottom: 0,
      "start": 10,
      "end": 80,
      handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: "#d3dee5",
      },
      textStyle: {
        color: "#fff",
        fontSize: '16px'
      },
      borderColor: "#90979c"
    }, {
      "type": "inside",
      "show": true,
      "height": 15,
      "start": 1,
      "end": 35
    }],
    "series": [
    {
      "name": "出警",
      "type": "bar",
      "stack": "总量",
      "itemStyle": {
        "normal": {
          "color": "rgba(0,191,183,1)",
          "barBorderRadius": 0,
          "label": {
            "show": true,
            "position": "top",
            "fontSize": 20,
            formatter: function (p) {
              return p.value > 0 ? (p.value) : '';
            }
          }
        }
      },
      "data": filterData("dealnum")
    },
    {
      "name": "警情",
      "type": "line",
      "stack": "总量",
      symbolSize: 10,
      symbol: 'circle',
      "itemStyle": {
        "normal": {
          "color": "rgba(252,230,48,1)",
          "barBorderRadius": 0,
          "label": {
            "fontSize": 20,
            "show": true,
            "position": "top",
            formatter: function (p) {
              return p.value > 0 ? (p.value) : '';
            }
          }
        }
      },
      "data": filterData("allnum")
    },
    ]
  }
  return option;
}
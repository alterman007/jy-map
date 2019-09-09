import React from 'react';
import { bindActionCreators } from 'redux';
import echarts from 'echarts';
import { connect } from 'react-redux';
import { setIshowPrevButton, setIshowPCSPoliceModal } from '../../actions/cpmStatus';
import './index.styl';
import PrevButton from './PrevButton';

const mapDipatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowPrevButton,
      setIshowPCSPoliceModal
    }, dispatch)
  }
}

class PieChart extends React.Component {
  pieChart = React.createRef()

  componentDidMount() {
    this.createPieChart()
  }
  createPieChart() {
    const { data, name } = this.props
    var mychart = echarts.init(this.pieChart.current);
    mychart.setOption({
      title: {
        // text: '今日警情统计',
        // subtext: `${moment().format('YYYY MM DD')}`,
        subtext: `${name ? name : '全市'}警情分布`,
        x: 'center',
        textStyle: {
          color: 'white',
        },
        subtextStyle: {
          color: 'white',
          fontSize: 18
        },
        y: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      label: {
        fontSize: 20
    },
  series : [
    {
        name: '警情统计',
        type: 'pie',
        radius: ['29%', '59%'],
        center: ['50%', '50%'],
        label:{
          show:true,
          formatter:'{b}: {d}%',
        },
    data: data.map(e => {
      return {value: e['allnum'], name: e.name, fkdw: e.fkdw || 0}
    }),
    // data : [{value: 70, name: 1}, {value: 20, name: 2}],
    itemStyle: {
      normal: {
        fontSize:20
      },
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: 20
      }
    }
    }
  ]})

  mychart.on('click', (e) => {
    const { fkdw, name } = e.data;
    if(!+fkdw) return; // 区分点击的是分局还是派出所;
    // this.props.fetchStatistical(fkdw, name)
    // this.props.actions.setIshowPrevButton(true)
    this.props.actions.setIshowPCSPoliceModal({
      iShow: true,
      name,
      dm:fkdw
    })
  })
  }

  
  prevHandleClick() {
    this.props.actions.setIshowPrevButton(false)
    this.props.fetchStatistical()
  }

  render() {
    const { data, name } = this.props;
    const  sortData = [...data]
    
    return (
      <div className="piechart">
        <h2>{`${name ? name : '全市'}警情分布`}</h2>
        <PrevButton 
          prevHandleClick={this.prevHandleClick.bind(this)}
        />
        <div ref={this.pieChart} style={{width: '100%', height: '400px'}}>

        </div>
        <h2>{`${name ? name : '全市'}统计`}</h2>
        <ul>
          {
            sortData.sort((a, b) => {
              return b.allnum - a.allnum
            }).map(d => {
              return <li key={d.fkdw}>{`${d.name} ${d['allnum']}`}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(null, mapDipatchToProps)(PieChart);
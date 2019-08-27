import React, { Component } from 'react';
import Title from '../../components/Title';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import { getPoliceCall, getPoliceStationStatistical } from '../../request/api';
import icon from './icon2.png';

import './index.styl';
import PieChart from '../../components/PieChart';
import TodayStatisics from '../../components/TodayStatistics';

class PoliceCall extends Component {
  state = {
    hideList: true,
    timeRange: [],
    list: [],
    type: false,
    statistical:[]
  };
  timer = null;
  pieChart = React.createRef()
  constructor() {
    super()
    this.renderPoliceAll = this.renderPoliceAll.bind(this)
  }
  componentDidMount() {
    this.fetchList();
    this.fetchStatistical();
    // this.createPieChart();
  }

  togglePoliceVisible = () => {
    this.setState({
      hideList: !this.state.hideList,
    });
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.fetchStatistical()
      this.fetchList()
    }, 10000)
  }
  async fetchList() {
    const { data } = await getPoliceCall();
    this.setState({
      list: data,
    });
  }

  async fetchStatistical() {
    const { data } = await getPoliceStationStatistical();
    this.setState({
      statistical: data
    })
  }

  onSearch = () => {
    this.fetchList();
  }

  onTimeChange = (timeRange) => {
    this.setState({ timeRange });
  }

  renderIcon() {
    return <img onClick={this.togglePoliceVisible} className="police-call-icon" src={icon} alt="110" />;
  }

  renderPoliceAll(bl) {
    this.setState({
      type: bl
    })
  }

  renderType() {
    if(this.state.type) {
      const { statistical } = this.state
      let total = 0;
      statistical.forEach(s => {
        total += s["count(*)"]
      });
      return (
        <div className="police-statistical corner-border">
          <TodayStatisics data={statistical}/>
          <PieChart data={statistical}/>
        </div>
      )
    }
    const { list } = this.state;
    return (
      <div className="police-border police-call-list">
          {
            list.map((item, index) => (
              <div className="police-call-item" key={item.dwdZjid + index}>
                <div className="desc">
                  <span>反馈单号：{item.fkdbh}</span>
                  <span>反馈时间：{item.clwbsj}</span>
                  <span>处理民警姓名：{item.fkrxm}</span>
                  <span>处理案情单位：{item.fkdwmc}</span>
                  <span>处理民警警号：{item.fkrgh}</span>
                  <span>案&nbsp;&nbsp;由：{item.aymc === 'null' ? '' : item.aymc}</span>
                </div>
                <div className="text">
                  <span>出警情况：{item.cjqk}</span>
                </div>
              </div>
            ))
          }
          </div>
    )
  }

  renderContent() {
    return (
      <div className="police-call-info">
        <Title
          name="110联网警情"
          onClose={this.togglePoliceVisible}
        />
        <TimeRangeSearch selectName={this.state.type} onSearch={this.onSearch} renderPoliceAll={this.renderPoliceAll} onTimeChange={this.onTimeChange} />
        {
          this.renderType()
        }
      </div>
    );
  }

  render() {
    const { hideList } = this.state;
    return (
      <div className="police-call-wrapper">
        {hideList ? this.renderIcon() : this.renderContent()}
      </div>
    )
  }
}

export default PoliceCall;

import React, { Component } from 'react';
import Title from '../../components/Title';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import { getPoliceCall } from '../../request/api';
import icon from './icon2.png';

import './index.styl';

class PoliceCall extends Component {
  state = {
    hideList: true,
    timeRange: [],
    list: [],
  };

  togglePoliceVisible = () => {
    this.setState({
      hideList: !this.state.hideList,
    });
    this.fetchList();
  }

  async fetchList() {
    const { data } = await getPoliceCall();
    this.setState({
      list: data.result,
    });
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

  renderContent() {
    const { list } = this.state;
    console.log(list);
    return (
      <div className="police-call-info">
        <Title
          name="110联网警情"
          onClose={this.togglePoliceVisible}
        />
        <TimeRangeSearch onSearch={this.onSearch} onTimeChange={this.onTimeChange} />
        <div className="police-call-list corner-border">
          {
            list.map((item) => (
              <div class="police-call-item" key={item.dwdZjid}>
                <div className="desc">
                  <span>反馈单号：{item.fkdbh}</span>
                  <span>反馈时间：{item.fkjssj}</span>
                  <span>处理民警姓名：{item.fkjsrxm}</span>
                  <span>处理案情单位：{item.fkjsdw}</span>
                  <span>处理民警警号：{item.fkjsryhbh}</span>
                  <span>案&nbsp;&nbsp;由：{item.ay}</span>
                </div>
                <div className="text">
                  <span>出警情况：{item.cjqk}</span>
                </div>
              </div>
            ))
          }
          </div>
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

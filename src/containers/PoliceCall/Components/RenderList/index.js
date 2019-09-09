import React from 'react';
import moment from 'moment';
import { getPoliceCall } from '../../../../request/api';
class RenderList extends React.Component {
  state = {
    list: []
  }
  timer = null;
  componentDidMount() {
    this.fetchList();
    this.timer = setInterval(() => {
      this.fetchList();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.setState = () => {
      return;
    }
  }

  async fetchList() {
    const { data } = await getPoliceCall();
    this.setState({
      list: data,
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="corner-border police-call-list">
        {
          list.length > 0 ?list.map((item, index) => (
            <div className="police-call-item" key={item.dwdZjid + index}>
              <div className="desc">
                <span>反馈单号：{item.fkdbh}</span>
                <span>反馈时间：{moment(item.dwRksj, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}</span>
                <span>处理民警姓名：{item.fkrxm}</span>
                <span>所属分局：{item.fkdwmc}</span>
                <span>处理案情单位：{item.fkxcdwmc}</span>
                <span>处理民警警号：{item.fkrgh}</span>
                <span>案&nbsp;&nbsp;由：{item.aymc === 'null' ? '' : item.aymc}</span>
              </div>
              <div className="text">
                <span>出警情况：{item.cjqk}</span>
              </div>
            </div>
          )) : <div className="search-by-time">暂无实时数据</div>
        }
      </div>
    )
  }
}

export default RenderList;
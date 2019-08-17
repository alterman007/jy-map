import React, { Component } from 'react';
import classnames from 'classnames';
import FontIcon from '../../components/FontIcon';
import TimeRangeSearch from '../../components/TimeRangeSearch';
// import demoImg from './demo.png';
import './index.styl';

class ForceSnapshot extends Component {
  state = {
    selected: 'people',
    list: [
      this.props.defaultValue,
    ],
  };

  changeSelected = (ev) => {
    const { type } = ev.target.dataset;
    if (type) {
      this.setState({ selected: type });
    }
  }

  onSearch = (ev) => {
    console.log('start search');
  }

  onTimeChange = (ev) => {
    console.log('timer change');
  }

  renderTab() {
    const { selected } = this.state;
    return (
      <div className="snapshot-tab">
        <svg className="button-bg" onClick={this.changeSelected}>
          <path
            data-type="people"
            className={classnames({ active: selected === 'people' })}
            transform="translate(-455, -155)"
            d="M455,155L455,192L595,193L575,156L455,155Z"
          />
          <path
            data-type="car"
            className={classnames({ active: selected === 'car' })}
            transform="translate(-454, -155)"
            d="M588,156L607,192L746,192L727,156L588,156Z"
          />
          <text transform="translate(14, 27)">人脸图像</text>
          <text transform="translate(169, 27)">车辆图像</text>
        </svg>
        <button className="button-close" onClick={this.props.onClose}>
          <FontIcon type="close" className="close-btn" />
        </button>
      </div>
    );
  }

  renderList() {
    const { list } = this.state;
    console.log(list);
    return (
      <div className="snapshot-list-wrapper corner-border-highlight-bg">
        {
          list.map((item, index) => (
            <div className="snapshot-item" key={item.name + index}>
              <div className="header">{item.name}</div>
              <div className="img-list">
                {/* {item.imgs.map((src, i) => <img key={i} src={demoImg} alt="" />)} */}
              </div>
              <div className="desc">
                <span>所属派出所：{item.belongTo}</span>
                <span>设备号：{item.deviceCode}</span>
                <span>经 度：{item.lng}</span>
                <span>摄像头位置：{item.cameraPosition}</span>
                <span>纬 度：{item.lat}</span>
                <span>创建日期：{item.time}</span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className="force-snapshot-wrapper">
        {this.renderTab()}
        <div className="search-wrapper">
          <TimeRangeSearch onSearch={this.onSearch} onTimeChange={this.onTimeChange} />
        </div>
        {this.renderList()}
      </div>
    )
  }
}

export default ForceSnapshot;

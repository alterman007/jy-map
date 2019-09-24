import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontIcon from '../../components/FontIcon';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import { getCarCaptureById, getFaceCaptureById } from '../../request/api';
import { message } from 'antd';
import ImageLazyLoad from '@/components/ImageLazyLoad';
import { setIshowHDPICModal } from '@/actions/cpmStatus';
import './index.styl';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowHDPICModal
    }, dispatch)
  }
}

class ForceSnapshot extends Component {
  state = {
    selected: 'people',
    list: [
      this.props.defaultValue,
    ],
    carCaptureList: [],
    faceCaptureList: [],
    time: ''
  };

  rootList = React.createRef()

  componentDidMount() {
    this.getFaceCaptureInfo()
  }
  async getFaceCaptureInfo(config) {
    try {
      const params = config ? config : {
        vehicleIdentification: this.props.defaultValue.name,
        endtime: this.props.defaultValue.createTime,
        biggintime: moment(this.props.defaultValue.createTime).format('YYYY-MM-DD 00:00:00'),
        limit: 100
      }
      const { data } = await getFaceCaptureById(params);
      this.setState({
        carCaptureList: data
      })
    } catch (error) {
      console.error(error);
      // message.error('')
    }
  }
  async getCarCaptureById(config) {
    try {
      const params = config ? config : {
        vehicleIdentification: this.props.defaultValue.name,
        endtime: this.props.defaultValue.createTime,
        biggintime: moment(this.props.defaultValue.createTime).format('YYYY-MM-DD 00:00:00'),
        limit: 100
      }
      const { data } = await getCarCaptureById(params);
      this.setState({
        carCaptureList: data
      })
    } catch (error) {
      
    }
  }

  changeSelected = (ev) => {
    const { type } = ev.target.dataset;
    this.rootList.current.scrollTo({
      top: 0,
      behavior: "smooth"
    }); 
    if (type) {
      this.setState({ selected: type }, () => {
        type === 'people' ? this.getFaceCaptureInfo() : this.getCarCaptureById()
      });
    }
  }

  async onSearch (ev) {
    try {
      const { time = this.props.defaultValue.createTime, selected } = this.state;
      const config = {
        vehicleIdentification: this.props.defaultValue.name,
        biggintime: moment(time).format('YYYY-MM-DD 00:00:00'),
        endtime: time,
        limit: 100
      }
      selected === 'people' ?  this.getFaceCaptureInfo(config) : this.getCarCaptureById(config)
    } catch (error) {
      message.error('查询失败', error)
    }
  }

  onTimeChange(time) {
    this.setState({
      time
    })
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
          <text transform="translate(14, 27)" className={classnames({activeText: selected === 'people'})}>人脸图像</text>
          <text transform="translate(169, 27)" className={classnames({activeText: selected === 'car'})}>车辆图像</text>
        </svg>
        <button className="button-close" onClick={this.props.onClose}>
          <FontIcon type="close" className="close-btn" />
        </button>
      </div>
    );
  }

  renderList() {
    const { list } = this.state;
    return (
      <div className="snapshot-list-wrapper corner-border-highlight-bg" ref={this.rootList}>
        {
          list.map((item, index) => (
            <div className="snapshot-item" key={item.name + index}>
              <div className="header">{item.name}</div>
              <div className="img-list">
              </div>
            </div>
          ))
        }     
        {this.rendercarCaptureList()}
      </div>
    )
  }

  imgClick(item) {
    const { selected } = this.state
    this.props.actions.setIshowHDPICModal({
      hdpic: item.carNumberQjSrc || item.bszImageSrc,
      ishow: true,
      name: item.cameraName,
      time: item.createTime,
      address: item.sspcs,
      detailInfo: item,
      type: selected === 'people' ? 4 : 5 // 车辆抓拍
    })
  }

  rendercarCaptureList() {
    const { carCaptureList, selected } = this.state
    return carCaptureList.length > 0 ? (
      <ul>
        {
          carCaptureList.map((c, index) => {
            return <li key={c.id + index}>
              <div className="img">
                <ImageLazyLoad
                  imgsrc={selected === 'people' ? c.baseImageSrc : c.carNumberSrc}
                  alt=""
                  imgClick={this.imgClick.bind(this, c)}
                />
              </div>
              <div>
                <span>所属派出所：{c.sspcs}</span>
                <span>设备号：{c.indexCode}</span>
                <span>经 度：{c.longitude}</span>
                <span>摄像头位置：{c.cameraName}</span>
                <span>纬 度：{c.latitude}</span>
                <span>拍摄时间：{c.createTime}</span>
              </div>
            </li>
          })
        }
      </ul>
    ) : <div className="search-by-time">暂无当日抓拍信息, 输入日期以搜索</div>
  }

  render() {
    return (
      <div className="force-snapshot-wrapper">
        {this.renderTab()}
        <div className="search-wrapper">
          <TimeRangeSearch onSearch={this.onSearch.bind(this)} history onTimeChange={this.onTimeChange.bind(this)} />
        </div>
        {this.renderList()}
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ForceSnapshot);

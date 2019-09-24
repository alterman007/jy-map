import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import Title from '../../components/Title';
import ImageLazyLoad from '../../components/ImageLazyLoad';
import { alarmType } from '../../constants/alarmConstants';
import {
  toggleAlarmHistoryVisible,
  fetchAlarmHistory,
  selectAlarmItem,
  setAlarmHistoryListIsSelected,
  setAlarmHistoryList
} from '../../actions/alarmHistory';
import { setIshowHDPICModal } from '../../actions/cpmStatus';
import './index.styl';
import { message } from 'antd';

const mapStateToProps = (state) => ({
  alarmHistoryVisible: state.alarmHistory.visible,
  alarmHistoryList: state.alarmHistory.list,
  movePath: state.map.movePath
});
const mapDispatchProps = (dispatch) => ({
  actions: bindActionCreators({
    toggleAlarmHistoryVisible,
    fetchAlarmHistory: fetchAlarmHistory.startAction,
    setAlarmHistoryList,
    selectAlarmItem,
    setAlarmHistoryListIsSelected,
    setIshowHDPICModal
  }, dispatch),
});

class NetworkAlarmHistory extends Component {
  state = {
    tabActive: 'car', // face car
    timeRange: '',
    selectedId: null,
    selectType: 1
  }
  pagenum = 1;
  pagesize = 50;
  endItem = React.createRef();
  rootList = React.createRef();
  alarm = '';

  componentDidMount() {
    this.onSearch();
  }

  componentDidUpdate(pp) {
    if (this.props.alarmHistoryVisible && !pp.alarmHistoryVisible) {
      //开始监听
      this.initObserve();
    }
    if (!this.props.alarmHistoryVisible && pp.alarmHistoryVisible) {
      // 取消监听
      this.pagenum = 1;
      this.io.disconnect(this.endItem.current);
    }
  }

  initObserve() {
    this.io = new IntersectionObserver((entries) => {
      entries.forEach(item => {
        if (item.intersectionRatio > 0) {
          this.onSearch(++this.pagenum);
        }
      })
    }, {
      root: this.rootList.current,
      rootMargin: "0px 0px 1000px 0px"
    });
    this.observe();
  }

  observe() {
    if (this.endItem.current) {
      this.io.observe(this.endItem.current)
    }
  }

  handleClose = () => {
    const { actions } = this.props;
    actions.toggleAlarmHistoryVisible(false);
  }

  scrollToTop() {
    this.rootList.current.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  switchTab = ({ target }) => { // 切换tab平滑滚动到0;
    this.scrollToTop();
    this.pagenum = 1;
    this.props.actions.setAlarmHistoryList(0);
    if (target.dataset.type) {
      this.setState({ tabActive: target.dataset.type }, () => {
        this.onSearch();
      });
    }
  }

  onSelectItem = (item) => {
    if (!+item.lat || !+item.lng) return message.warning("暂无定位信息");
    this.setState({
      selectedId: item.id
    })
    const { actions } = this.props;
    actions.selectAlarmItem(item);
  }

  onTimeChange = (time) => {
    this.pagenum = 1;
    this.setState({
      timeRange: time,
    }, () => {
        this.props.actions.setAlarmHistoryList(0);
    });
  }

  onSelectChange = (selectType) => {
    if (selectType === this.state.selectType) return;
    this.props.actions.setAlarmHistoryList(0);
    this.scrollToTop();
    this.pagenum = 1;
    this.setState({
      selectType
    }, () => {
      this.onSearch();
    })
  }

  onSearch = (pagenum = this.pagenum, pagesize = this.pagesize) => {
    const { actions } = this.props;
    const { timeRange, tabActive, selectType } = this.state;
    actions.fetchAlarmHistory({ timeRange, tabActive, pagesize, pagenum, selectType });
  }

  onSearchBtnClick = () => {
    const { alarmHistoryList, actions } = this.props;
    if (alarmHistoryList.length > 0) {
      actions.setAlarmHistoryList(0)
    }
    this.onSearch()
  }

  renderTypeTab() {
    const { tabActive } = this.state;
    return (
      <>
        <div className="type-tab" onClick={this.switchTab}>
          <span
            className={classnames({ active: tabActive === 'face' })}
            data-type="face"
          >人脸告警</span>
          <span
            className={classnames({ active: tabActive === 'car' })}
            data-type="car"
          >车辆告警</span>
        </div>
      </>
    );
  }

  imgClick = (item, e) => {
    e.stopPropagation();
      let type, name, time, imgsrc, address, hdpic;
      type = item.type;
      name = item.name;
      time = item.alarmTime;
      imgsrc = item.baseImage;
      address = item.address;
      hdpic = item.hdpicImage;
      this.props.actions.setIshowHDPICModal({
        type, name, time, imgsrc, address, hdpic,
        detailInfo: item.detailInfo,
        ishow: true,
      })
  }

  renderAlarmList() {
    const { alarmHistoryList } = this.props;
    const { tabActive, selectedId } = this.state;
    // const isFace = tabActive === 'face';
    // const test = "http://img4.bdimg.com/it/u=3565682627,2876030475&fm=26&gp=0.jpg"
    return (
      <ul className="alarm-list corner-border" ref={this.rootList}>
        {
          alarmHistoryList.length > 0 ? alarmHistoryList.map((item) => {
            return (
              <li key={item.id} onClick={() => this.onSelectItem(item)} className={`${item.id == selectedId ? 'isSelected alarm-item' : 'alarm-item'}`}>
                <ImageLazyLoad imgClick={(e) => this.imgClick(item,e)} imgsrc={item.baseImage} />
                {/* <img src={isFace ? item.facePicUrl : item.picVehicle } alt=""/> */}
                <div className="alarm-desc">
                  <span className="name">
                    {item.name ? item.name : '未知'}
                  </span>
                  <span className="alarm-type" style={{color: 'red'}}>{alarmType[item.type]}</span>
                  <span className="time">
                    {item.alarmTime}
                  </span>
                </div>
              </li>
            )
          }) :
            <li className="search-by-time">暂无数据...</li>
        }
        <li ref={this.endItem} style={{ opacity: "0" }}>到底了...</li>
      </ul>
    );
  }

  render() {
    const { alarmHistoryVisible, movePath } = this.props;
    const { selectType } = this.state;
    if (movePath) return null;
    if (!alarmHistoryVisible) {
      return null;
    }
    return (
      <div className="network-alarm-history-wrapper" ref={this.alarm}>
        <Title name="联网告警历史" onClose={this.handleClose} />
        {this.renderTypeTab()}
        {/* <hr /> */}
        <TimeRangeSearch
          onSearch={this.onSearchBtnClick}
          history
          onTimeChange={this.onTimeChange}
          onSelectChange={this.onSelectChange}
          selectType={selectType}
          iShowSelectType
        />
        {this.renderAlarmList()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(NetworkAlarmHistory);

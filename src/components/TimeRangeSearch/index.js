import React, { Component } from 'react';
import { DatePicker } from 'antd';
// import moment from 'moment';
import './index.styl';

const { RangePicker } = DatePicker;

class TimeRangeSearch extends Component {
  pickerStyle = {
    width: '60%',
    background: 'rgba(71,156,223,0.30)',
  };

  render() {
    const { onTimeChange, onSearch, history, selectName } = this.props;
    return (
      <div className="time-range-search-wrapper">
        {
          history &&
           <>
            <RangePicker
              className="time-range-wrapper"
              showTime
              size="large"
              style={this.pickerStyle}
              separator="-"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={onTimeChange}
              placeholder={['开始时间', '结束时间']}
            />
            <button
          className="search-btn"
          onClick={onSearch}
          // onClick={() => this.props.renderPoliceAll(false)}
        >搜索</button>
           </>
        }
        {
          !history &&
          <>
          <button
          className="search-btn"
          style={{background: !selectName ? '#20aaff':'rgba(32,170,255,0.5)'}}
          onClick={() => this.props.renderPoliceAll(false)}
        >实时警情</button>
        <button
          className="search-btn"
              style={{ background: selectName ? '#20aaff' : 'rgba(32,170,255,0.5)'}}
          onClick={() => this.props.renderPoliceAll(true)}
        >分局统计</button>
          </>
        }
      </div>
    );
  }
}

export default TimeRangeSearch;

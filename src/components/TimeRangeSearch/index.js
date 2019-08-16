import React, { Component } from 'react';
import { DatePicker } from 'antd';
// import moment from 'moment';
import './index.styl';

const { RangePicker } = DatePicker;

class TimeRangeSearch extends Component {
  pickerStyle = {
    width: '85%',
    background: 'rgba(71,156,223,0.30)',
  };

  render() {
    const { onTimeChange, onSearch } = this.props;
    return (
      <div className="time-range-search-wrapper">
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
        >搜 索</button>
      </div>
    );
  }
}

export default TimeRangeSearch;

import React, { Component } from 'react';
import { DatePicker, Select } from 'antd';
// import moment from 'moment';
import './index.styl';

class TimeRangeSearch extends React.PureComponent {
  pickerStyle = {
    width: '60%',
    background: 'rgba(71,156,223,0.30)',
  };
  

  onTimeChange(undef, time) {
    this.props.onTimeChange(time)
  }

  render() {
    const { onTimeChange, onSearch, history, selectName, value, onSelectChange, selectType, iShowSelectType } = this.props;
    console.log("渲染")
    return (
      <div className="time-range-search-wrapper">
        {
          history &&
           <>
            {/* <RangePicker
              className="time-range-wrapper"
              showTime
              size="large"
              style={this.pickerStyle}
              separator="-"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={onTimeChange}
              placeholder={['开始时间', '结束时间']}
            /> */}
            <DatePicker
              className="data-picker"
              showTime
              size="large"
              style={this.pickerStyle}
              separator="-"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={this.onTimeChange.bind(this)}
              placeholder="选择时间"
            />
            {
              iShowSelectType && 
               <Select
               value={selectType}
               className="select"
               dropdownClassName="open-select"
               onSelect={onSelectChange}
             >
               <Select.Option value={0}>卡口</Select.Option>
               <Select.Option value={1}>车载</Select.Option>
             </Select>
           }
            <button
          className="search-btn"
          onClick={onSearch}
          // onClick={() => this.props.renderPoliceAll(false)}
        >搜&nbsp;&nbsp;索</button>
           </>
        }
        {
          !history &&
          <>
          <button
          className="search-btn"
          style={{
            background: !selectName ? '#68E0FB':'#05121C',
            color: !selectName ? 'black' : 'white',
        }}
          onClick={() => this.props.renderPoliceAll(false)}
        >实时警情</button>
        <button
          className="search-btn"
              style={{
                 background: selectName ? '#68E0FB' : '#05121C',
                 color: selectName ? 'black' : 'white',
            }}
          onClick={() => this.props.renderPoliceAll(true)}
        >分局统计</button>
          </>
        }
      </div>
    );
  }
}

export default TimeRangeSearch;

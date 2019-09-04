import React, { Component } from 'react';
import Title from '../../components/Title';
import TimeRangeSearch from '../../components/TimeRangeSearch';
import './index.styl';
import RenderIcon from './Components/RenderIcon';
import RenderChart from './Components/RenderChart';
import RenderList from './Components/RenderList';


let i = 0;

class PoliceCall extends Component {
  state = {
    hideList: true,
    timeRange: [],
    list: [],
    type: false,
    statistical:[],
    name: '全市'
  };
  timer = null;
  pieChart = React.createRef()
  constructor() {
    super()
    this.renderPoliceAll = this.renderPoliceAll.bind(this)
  }

  togglePoliceVisible = () => {
    this.setState({
      hideList: !this.state.hideList,
    })
  }

  renderIcon() {
    return (
      <RenderIcon togglePoliceVisible={this.togglePoliceVisible.bind(this)}/>
    )
  }

  renderPoliceAll(bl) {
    this.setState({
      type: bl
    })
  }

  renderType() {
    if(this.state.type) {
      return (
        <RenderChart />
      )
    } else {
      return <RenderList />
    }
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

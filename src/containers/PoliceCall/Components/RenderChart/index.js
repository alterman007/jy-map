import React from 'react';
import PieChart from '../../../../components/PieChart';
import TodayStatisics from '../../../../components/TodayStatistics';
import DayOrMonth from '@/components/DayOrMonth';
import { getPoliceStationStatistical } from '../../../../request/api';
import { getuuid } from '../../../../utils/func';
import { dm } from '@/utils/func';

const dmbyurl = dm

class RenderChart extends React.Component {
  state = {
    list: [],
    statistical: [],
    name: '全市',
    deal: 0,
    type: 1
  };
  timer = null;
  componentDidMount() {
    this.fetchStatistical();
  }
  async fetchStatistical(dm = dmbyurl, name = undefined, type = 1) {
    // const { data } = await getPoliceStationStatistical({ dm, name, type });
    const { data } = await getPoliceStationStatistical({ dm, type });
    this.setState({
      statistical: data.list,
      total: data.allnum,
      deal: data.dealnum,
      name: data.name
    })
  }

  changeType(type) {
    this.setState({
      type
    }, () => {
      this.fetchStatistical(undefined, undefined, type);
    })
  }

  render() {
    const { statistical, total, deal, name, type } = this.state;
    return (
      <div className="police-statistical corner-border">
        <DayOrMonth
          changeType={this.changeType.bind(this)}
          type={type}
        />
        <TodayStatisics
          deal={deal}
          total={total}
          title={name}
          key={getuuid()}
        />
        <PieChart
          data={statistical}
          fetchStatistical={this.fetchStatistical.bind(this)}
          key={getuuid()}
          name={name}
          type={type}
        />
      </div>
    )
  }
}

export default RenderChart;
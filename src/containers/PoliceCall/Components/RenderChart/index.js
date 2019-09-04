import React from 'react';
import PieChart from '../../../../components/PieChart';
import TodayStatisics from '../../../../components/TodayStatistics';
import { getPoliceStationStatistical } from '../../../../request/api';
import { getuuid } from '../../../../utils/func';

class RenderChart extends React.Component {
    state = {
        list: [],
        statistical:[],
        name: '全市',
        deal: 0
      };
      timer = null;
    componentDidMount() {
        this.fetchStatistical();
    }
    async fetchStatistical(dm = undefined, name = undefined) {
        const { data } = await getPoliceStationStatistical({dm, name});
        this.setState({
          statistical: data.list,
          total: data.allnum,
          deal: data.dealnum,
          name: data.name
        })
      }
    
    render() {
      const { statistical, total, deal, name } = this.state;
        return (
            <div className="police-statistical corner-border">
                <TodayStatisics 
                deal={deal} 
                total={total}
                key={getuuid()}
                />
                <PieChart 
                data={statistical}   
                fetchStatistical={this.fetchStatistical.bind(this)}
                key={getuuid()}
                name={name}
                />
            </div>
        )
    }
}

export default RenderChart;
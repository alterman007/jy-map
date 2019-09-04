import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  toggleForceHistoryVisible,
  fetchForceHistory,
  selectForceHistoryItem
} from '../../../../actions/forceHistory';
import {
  selectRealTimeMarker,
} from '../../../../actions/map';
// import './index.styl';
import { message } from 'antd';

const mapStateToProps = (state) => ({
    forceHistoryVisible: state.forceHistory.visible,
    forceHistoryList: state.forceHistory.list,
    // movePath: state.map.movePath
  });
  const mapDispatchProps = (dispatch) => ({
    actions: bindActionCreators({
      toggleForceHistoryVisible,
      fetchForceHistory: fetchForceHistory.startAction,
      selectForceHistoryItem,
      selectRealTimeMarker
    }, dispatch),
  });
  

class ForceHistoryList extends React.Component {

    state = {
        timeRange: {},
        selectId: null,
      }    

      static getDerivedStateFromProps(props, state) {
        if (!props.forceHistoryVisible) {
          return {
            selectedId: null,
          };
        }
        return null;
      }

    
      onTimeChange = (dates) => {
        console.log(dates);
      }
    
      onSearch = () => {
        console.log('search');
      }
    
    
      onSelectItem = (item) => {
        this.setState({
          selectId: item.id
        })
        const { actions } = this.props;
        if (!item.lat && !item.lng) {
          return message.error("暂无定位信息")
        }
        actions.selectForceHistoryItem(item);
        actions.selectRealTimeMarker(null);
      }
    
    renderForceList() {
        const { forceHistoryList } = this.props;
        const { selectId } = this.state;
        return (
          <ul className="force-list corner-border">
            {
              forceHistoryList.map((item, index) => {
                return (
                <li key={item.name + index} ref="li" onClick={() => this.onSelectItem(item)} className={`${item.id === selectId ? 'active force-item' : 'force-item'} `}>
                  <img src={item.pic} alt="" />
                  <div className="force-desc">
                    <span className="name">
                      {item.name}
                    </span>
                    <span className="item">
                      所属派出所：{item.pcs}
                    </span>
                    <span className="item">
                      日期：{item.createTime}
                    </span>
                  </div>
                </li>
               )
              })
            }
          </ul>
        );
    }
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchForceHistory();
    }
    render() {
        return (
            <>
             {this.renderForceList()}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchProps)(ForceHistoryList)
import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIshowPCSPoliceModal } from '../../actions/cpmStatus';
import TodayStatistics from '../TodayStatistics';
import { getPoliceStationStatistical } from '../../request/api';
import { getuuid } from '@/utils/func';
import './index.styl';
import BarChart from '../BarChart';
import DayOrMonth from '../DayOrMonth';

const mapStateToProps = (state) => {
  return {
    iShowPCSPoliceCallModal: state.cmpStatus.iShowPCSPoliceCallModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setIshowPCSPoliceModal,
    }, dispatch)
  }
}

function usePCSPoliceCallEffect() {

  const [state, setState] = useState({
    data: {
      list: []
    }
  });

  const initData = async(config = {}) => {
    try {
      const { data } = await getPoliceStationStatistical(config);
      setState({
        ...state, data
      })
    } catch (error) {
      console.error(error)
    }
  }
  return [state, setState, initData]
}

const PCSPoliceCall = ({ iShowPCSPoliceCallModal, actions }) => {

  const [state, setState, initData] = usePCSPoliceCallEffect();

  const [type, setType] = useState(2);

  const changeType = (type) => {
    setType(type);
    initData({
      ...iShowPCSPoliceCallModal,
      type
    })
  }

  useEffect(() => {
    iShowPCSPoliceCallModal.iShow && initData({
      ...iShowPCSPoliceCallModal,
      type
    })
  }, [iShowPCSPoliceCallModal])

  const { allnum, dealnum } = state.data;

  return (
    <Modal
      visible={iShowPCSPoliceCallModal.iShow}
      title={`${iShowPCSPoliceCallModal.name}警情统计`}
      className="corner-border resetModalStye pcs-policecall-modal "
      onCancel={() => actions.setIshowPCSPoliceModal({iShow: false})}
      footer={null}
      width={1000}
      mask={false}
      zIndex={0}
    >
      <div>
        <DayOrMonth
          type={type}
          changeType={changeType}
        />
        {
          useMemo(() => {
            return <TodayStatistics
            key={getuuid()}
            title=''
            total={allnum}
            deal={dealnum}
          />
          },[state.data])
        }
        
        {
          useMemo(() => {
           return <BarChart
              key={getuuid()}
              data={state.data}
            />
        }, [state.data])
        }
        
      </div>
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PCSPoliceCall)
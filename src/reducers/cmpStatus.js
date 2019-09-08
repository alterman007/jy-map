import { handleActions } from 'redux-actions';
import
{
  setTransFormToLeft,
  setIsAlarmComing,
  setIshowPrevButton,
  setIshowHDPICModal,
  setIshowPCSPoliceModal
}
  from '../actions/cpmStatus';

const defaultState = {
    tranformToLeft: '', //控制弹出框平移动画
    isAlarmComing: '', //控制110警情闪烁动画
    iShowPrevButton: false, // 是否显示上一级按钮
    isShowHDPICModal: {
      src: "",
      ishow: false
  }, // 是否显示高清大图modal
  iShowPCSPoliceCallModal: {
    iSHow: false
  }
  };

const cmpStatus = handleActions(
  {
    [setIshowPCSPoliceModal](state, { payload }) {
      return {...state, iShowPCSPoliceCallModal: payload}
    },
    [setTransFormToLeft](state, { payload }) {
      return {...state, tranformToLeft: payload}
    },
    [setIsAlarmComing](state, { payload }) {
      return {...state, isAlarmComing: payload}
    },
    [setIshowPrevButton](state, {payload}) {
      return {...state, iShowPrevButton: payload}
    },
    [setIshowHDPICModal](state, { payload }) {
      return {...state, isShowHDPICModal: payload}
    }
    // [setIshowCarMarkers](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
    // [setIshowHeatLayers](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
    // [setIshowRadioMarkers](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
    // [setIshowMonitorMarkers](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
    // [setIshowNetworkAlarmHistory](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
    // [setIshowNetWorkForceHistory](state, { payload }) {
    //   return {...state, isAlarmComing: payload}
    // },
},
defaultState,
);

export default cmpStatus;
  
import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_TRANFORM_LEFT,
  HTTP_FETCH_ISALARM_COMING,
  SET_ISALARM_COMING,
  SET_ISSHOW_CAR_MARKERS,
  SET_ISSHOW_HEAT_LAYERS,
  SET_ISSHOW_MONITOR_MARKERS,
  SET_ISSHOW_NETWORK_ALARM_HISTORY,
  SET_ISSHOW_NETWORK_FORCEH_ISTORY,
  SET_ISSHOW_RADIO_MARKERS,
  SET_ISSHOW_PREV_BUTTON,
  SET_ISSHOW_HDPIC_MODAL,
  SET_ISSHOW_PCSPOLICECALL_MODAL
} from '../constants/actionTypes';
import { createHttpAction } from './util';

export const fetchIsAlarmComing = createHttpAction(HTTP_FETCH_ISALARM_COMING); // 110警情闪烁
export const setTransFormToLeft = createAction(SET_TRANFORM_LEFT); // 详情动画
export const setIsAlarmComing = createAction(SET_ISALARM_COMING); // 110警情闪烁
export const setIshowCarMarkers = createAction(SET_ISSHOW_CAR_MARKERS); // 车辆打点
export const setIshowHeatLayers = createAction(SET_ISSHOW_HEAT_LAYERS); // 热力图控制
export const setIshowRadioMarkers = createAction(SET_ISSHOW_RADIO_MARKERS); // 电台控制
export const setIshowMonitorMarkers = createAction(SET_ISSHOW_MONITOR_MARKERS); // 固定监控点位控制
export const setIshowNetworkAlarmHistory = createAction(SET_ISSHOW_NETWORK_ALARM_HISTORY); //联网告警历史 
export const setIshowNetWorkForceHistory = createAction(SET_ISSHOW_NETWORK_FORCEH_ISTORY); //联网警力历史 （一般指车辆）
export const setIshowPrevButton = createAction(SET_ISSHOW_PREV_BUTTON); // 饼图上一级按钮控制
export const setIshowHDPICModal = createAction(SET_ISSHOW_HDPIC_MODAL); // 高清图弹框
export const setIshowPCSPoliceModal = createAction(SET_ISSHOW_PCSPOLICECALL_MODAL); // 派出所警情统计弹框

function createHTTPActionType(type) {
  return {
    START: type,
    FULFILLED: `${type}_FULFILLED`,
    REJECTED: `${type}_REJECTED`,
    PENDING: `${type}_PENDING`,
  };
}
export const TOGGLE_FORCE_HISTORY_VISIBLE = 'TOGGLE_FORCE_HISTORY_VISIBLE';
export const SET_FORCE_HISTORY_LIST = 'SET_FORCE_HISTORY_LIST';
export const SELECT_FORCE_HISTORY_ITEM = 'SELECT_FORCE_HISTORY_ITEM';
export const HTTP_FETCH_FORCE_HISTORY = createHTTPActionType('HTTP_FETCH_FORCE_HISTORY');
export const HTTP_FETCH_FORCE_PATH = createHTTPActionType('HTTP_FETCH_FORCE_PATH');
export const SET_FORCE_HISTORY_LIST_ISSELECTED = 'SET_FORCE_HISTORY_LIST_ISSELECTED'

export const TOGGLE_ALARM_HISTORY_VISIBLE = 'TOGGLE_ALARM_HISTORY_VISIBLE';
export const SET_ALARM_HISTORY_LIST = 'SET_ALARM_HISTORY_LIST';
export const SET_ALARM_HISTORY_LIST_ISSELECTED = 'SET_ALARM_HISTORY_LIST_ISSELECTED';
export const SELECT_ALARM_HISTORY_ITEM = 'SELECT_ALARM_HISTORY_ITEM';
export const SET_ALARM_HISTORY_DETAIL = 'SET_ALARM_HISTORY_DETAIL';
export const HTTP_FETCH_ALARM_HISTORY = createHTTPActionType('HTTP_FETCH_ALARM_HISTORY');

export const SELECT_REAL_TIME_MARKER = 'SELECT_REAL_TIME_MARKER';
export const SET_REAL_TIME_MARKERS = 'SET_REAL_TIME_MARKERS';
export const SET_MAP_PATH = 'SET_MAP_PATH';
export const SET_PATH_MOVE_FLAG = 'SET_PATH_MOVE_FLAG';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_PCSAREA = 'SET_MAP_PCSAREA'
export const HTTP_MAP_PCSAREA = createHTTPActionType('HTTP_MAP_PCSAREA');
export const SET_MAP_TRAIL = 'SET_MAP_TRAIL';
export const HTTP_FETCH_TRAIL = createHTTPActionType('HTTP_FETCH_TRAIL'); // 获取实时车辆
export const HTTP_FETCH_RADIO = createHTTPActionType('HTTP_FETCH_RADIO'); // 获取实时电台
export const SET_RADIO_TRALL = 'SET_RADIO_TRALL';
export const SET_TRANFORM_LEFT = 'SET_TRANFORM_LEFT';


// cmpstatus 组建状态
export const HTTP_FETCH_ISALARM_COMING = createHTTPActionType('HTTP_FETCH_ISALARM_COMING');
export const SET_ISALARM_COMING = 'SET_ISALARM_COMING';
export const SET_ISSHOW_CAR_MARKERS = 'SET_ISSHOW_CAR_MARKERS';
export const SET_ISSHOW_NETWORK_ALARM_HISTORY = 'SET_ISSHOW_NETWORK_ALARM_HISTORY';
export const SET_ISSHOW_NETWORK_FORCEH_ISTORY = 'SET_ISSHOW_NETWORK_FORCE_HISTORY';
export const SET_ISSHOW_HEAT_LAYERS = 'SET_ISSHOW_HEAT_LAYERS';
export const SET_ISSHOW_RADIO_MARKERS = 'SET_ISSHOW_RADIO_MARKERS';
export const SET_ISSHOW_MONITOR_MARKERS = 'SET_ISSHOW_MONITOR_MARKERS';
export const SET_ISSHOW_PREV_BUTTON = 'SET_ISSHOW_PREV_BUTTON'; 
export const SET_ISSHOW_HDPIC_MODAL = 'SET_ISSHOW_HDPIC_MODAL'; // 是否显示高清大图
export const SET_ISSHOW_PCSPOLICECALL_MODAL = 'SET_ISSHOW_PCSPOLICECALL_MODAL'; //派出所警情统计modal
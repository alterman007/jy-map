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

export const TOGGLE_ALARM_HISTORY_VISIBLE = 'TOGGLE_ALARM_HISTORY_VISIBLE';
export const SET_ALARM_HISTORY_LIST = 'SET_ALARM_HISTORY_LIST';
export const SELECT_ALARM_HISTORY_ITEM = 'SELECT_ALARM_HISTORY_ITEM';
export const HTTP_FETCH_ALARM_HISTORY = createHTTPActionType('HTTP_FETCH_ALARM_HISTORY');

export const SELECT_REAL_TIME_MARKER = 'SELECT_REAL_TIME_MARKER';
export const SET_REAL_TIME_MARKERS = 'SET_REAL_TIME_MARKERS';
export const SET_MAP_PATH = 'SET_MAP_PATH';
export const SET_PATH_MOVE_FLAG = 'SET_PATH_MOVE_FLAG';

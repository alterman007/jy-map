import { createAction } from 'redux-actions';
import { createHttpAction } from './util';
import {
  TOGGLE_ALARM_HISTORY_VISIBLE,
  SET_ALARM_HISTORY_LIST,
  HTTP_FETCH_ALARM_HISTORY,
} from '../constants/actionTypes';



export const toggleAlarmHistoryVisible = createAction(TOGGLE_ALARM_HISTORY_VISIBLE);
export const setAlarmHistoryList = createAction(SET_ALARM_HISTORY_LIST);
export const fetchAlarmHistory = createHttpAction(HTTP_FETCH_ALARM_HISTORY);

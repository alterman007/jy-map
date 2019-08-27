import { createAction } from 'redux-actions';
import { createHttpAction } from './util';
import {
  TOGGLE_ALARM_HISTORY_VISIBLE,
  SET_ALARM_HISTORY_LIST,
  HTTP_FETCH_ALARM_HISTORY,
  SELECT_ALARM_HISTORY_ITEM,
  SET_ALARM_HISTORY_LIST_ISSELECTED
} from '../constants/actionTypes';

export const toggleAlarmHistoryVisible = createAction(TOGGLE_ALARM_HISTORY_VISIBLE);
export const setAlarmHistoryList = createAction(SET_ALARM_HISTORY_LIST);
export const selectAlarmItem = createAction(SELECT_ALARM_HISTORY_ITEM);
export const setAlarmHistoryListIsSelected = createAction(SET_ALARM_HISTORY_LIST_ISSELECTED);

export const fetchAlarmHistory = createHttpAction(HTTP_FETCH_ALARM_HISTORY);

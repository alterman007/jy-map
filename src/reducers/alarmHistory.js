import { handleActions } from 'redux-actions';
import {
  toggleAlarmHistoryVisible,
  setAlarmHistoryList,
} from '../actions/alarmHistory';

const defaultState = {
  visible: false,
  list: [],
};

const alarmHistory = handleActions(
  {
    [toggleAlarmHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible };
    },
    [setAlarmHistoryList](state, { payload }) {
      return Array.isArray(payload) ? { ...state, list: payload } : state;
    },
  },
  defaultState,
);

export default alarmHistory;

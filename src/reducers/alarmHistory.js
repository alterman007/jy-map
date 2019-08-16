import { handleActions } from 'redux-actions';
import {
  toggleAlarmHistoryVisible,
  setAlarmHistoryList,
  selectAlarmItem,
} from '../actions/alarmHistory';

const defaultState = {
  visible: true,
  list: [],
  detailId: null,
};

const alarmHistory = handleActions(
  {
    [toggleAlarmHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible, detailId: null };
    },
    [setAlarmHistoryList](state, { payload }) {
      return Array.isArray(payload) ? { ...state, list: payload } : state;
    },
    [selectAlarmItem](state, { payload }) {
      return { ...state, detailId: payload };
    },
  },
  defaultState,
);

export default alarmHistory;

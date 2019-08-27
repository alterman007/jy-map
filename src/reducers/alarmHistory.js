import { handleActions } from 'redux-actions';
import {
  toggleAlarmHistoryVisible,
  setAlarmHistoryList,
  selectAlarmItem,
  setAlarmHistoryListIsSelected
} from '../actions/alarmHistory';

const defaultState = {
  visible: false,
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
    [setAlarmHistoryListIsSelected](state, { payload }) {
      return { ...state, list: payload}
    }
  },
  defaultState,
);

export default alarmHistory;

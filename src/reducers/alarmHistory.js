import { handleActions } from 'redux-actions';
import { toggleAlarmHistoryVisible } from '../actions/alarmHistory';

const defaultState = {
  visible: false,
};

const alarmHistory = handleActions(
  {
    [toggleAlarmHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible };
    },
  },
  defaultState,
);

export default alarmHistory;

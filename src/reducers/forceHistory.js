import { handleActions } from 'redux-actions';
import { toggleForceHistoryVisible } from '../actions/forceHistory';

const defaultState = {
  visible: true,
};

const forceHistory = handleActions(
  {
    [toggleForceHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible };
    },
  },
  defaultState,
);

export default forceHistory;

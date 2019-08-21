import { createAction } from 'redux-actions';

export function createHttpAction(httpType) {
  return ({
    startAction: createAction(httpType.START),
    pendingAction: createAction(httpType.PENDING),
    fulfilledAction: createAction(httpType.FULFILLED),
    rejectAction: createAction(httpType.REJECTED),
  });
}

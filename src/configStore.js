import { createStore } from 'redux';

function configStore(reducer) {
  const store = createStore(reducer);
  return store;
}

export default configStore;

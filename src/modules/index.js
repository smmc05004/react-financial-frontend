import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import ledger, { ledgerSaga } from './ledger';
// import period from './yearMonth';
import pagination from './pagination';

import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  ledger,
  pagination,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), ledgerSaga()]);
}

export default rootReducer;

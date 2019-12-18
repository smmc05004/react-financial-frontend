import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ledgerAPI from '../lib/api/ledger';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const INITIAL_FIELD = 'ledger/INITIAL_FIELD';
const CHANGE_FIELD = 'ledger/CHANGE_FIELD';
const [
  ADD_LEDGER,
  ADD_LEDGER_SUCCESS,
  ADD_LEDGER_FAILURE,
] = createRequestActionTypes('ledger/ADD_LEDGER');
const [
  LEDGERLIST,
  LEDGERLIST_SUCCESS,
  LEDGERLIST_FAILURE,
] = createRequestActionTypes('ledger/LEDGERLIST');

export const initialField = createAction(INITIAL_FIELD);
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}));

export const addLedger = createAction(
  ADD_LEDGER,
  ({ type, category, title, place, amount, user }) => ({
    type,
    category,
    title,
    place,
    amount,
    user,
  }),
);
export const ledgerList = createAction(LEDGERLIST, ({ pageNum, userId }) => ({
  pageNum,
  userId,
}));

const addLedgerSaga = createRequestSaga(ADD_LEDGER, ledgerAPI.addLedger);
const ledgerListSaga = createRequestSaga(LEDGERLIST, ledgerAPI.listLedgers);

export function* ledgerSaga() {
  yield takeLatest(ADD_LEDGER, addLedgerSaga);
  yield takeLatest(LEDGERLIST, ledgerListSaga);
}

const initialState = {
  write: {
    type: 'expense',
    category: '',
    title: '',
    place: '',
    amount: '',
    writeResult: null,
    writeError: null,
  },

  list: {
    list: null,
    listError: null,
    totalCount: 0,
  },
};

const ledger = handleActions(
  {
    [INITIAL_FIELD]: state => ({
      ...state,
    }),
    [CHANGE_FIELD]: (state, { payload: { name, value } }) =>
      produce(state, draft => {
        draft['write'][name] = value;
      }),

    [ADD_LEDGER_SUCCESS]: (state, { payload: ledger }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = ledger;
      }),
    [ADD_LEDGER_FAILURE]: (state, { payload: ledgerError }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = null;
        draft['write']['writeError'] = ledgerError;
      }),

    [LEDGERLIST_SUCCESS]: (state, { payload: { list, totalCount } }) =>
      produce(state, draft => {
        draft['list']['list'] = list;
        draft['list']['totalCount'] = totalCount;
      }),

    [LEDGERLIST_FAILURE]: (state, { payload: listError }) =>
      produce(state, draft => {
        draft['list']['listError'] = listError;
      }),
  },
  initialState,
);

export default ledger;

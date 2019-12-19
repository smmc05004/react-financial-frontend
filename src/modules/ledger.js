import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ledgerAPI from '../lib/api/ledger';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const INITIAL_FIELD = 'ledger/INITIAL_FIELD';
const CHANGE_FIELD = 'ledger/CHANGE_FIELD';
const EMPTYLEDGER = 'ledger/EMPTYLEDGER';

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
const [
  GET_LEDGER,
  GET_LEDGER_SUCCESS,
  GET_LEDGER_FAILURE,
] = createRequestActionTypes('ledger/GET_LEDGER');
const [
  UPDATE_LEDGER,
  UPDATE_LEDGER_SUCCESS,
  UPDATE_LEDGER_FAILURE,
] = createRequestActionTypes('ledger/UPDATE_LEDGER');

export const initialField = createAction(INITIAL_FIELD);
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}));
export const emptyLedger = createAction(EMPTYLEDGER);

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
export const getLedger = createAction(GET_LEDGER, ({ id }) => ({ id }));
export const updateLedger = createAction(
  UPDATE_LEDGER,
  ({ id, type, category, title, place, amount, user }) => ({
    id,
    type,
    category,
    title,
    place,
    amount,
    user,
  }),
);

const addLedgerSaga = createRequestSaga(ADD_LEDGER, ledgerAPI.addLedger);
const ledgerListSaga = createRequestSaga(LEDGERLIST, ledgerAPI.listLedgers);
const getLedgerSaga = createRequestSaga(GET_LEDGER, ledgerAPI.getLedger);
const updateLedgerSaga = createRequestSaga(
  UPDATE_LEDGER,
  ledgerAPI.updateLedger,
);

export function* ledgerSaga() {
  yield takeLatest(ADD_LEDGER, addLedgerSaga);
  yield takeLatest(LEDGERLIST, ledgerListSaga);
  yield takeLatest(GET_LEDGER, getLedgerSaga);
  yield takeLatest(UPDATE_LEDGER, updateLedgerSaga);
}

const initialState = {
  write: {
    id: '',
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

  read: {
    ledger: null,
    readError: null,
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

    [EMPTYLEDGER]: state =>
      produce(state, draft => {
        draft['write'] = initialState['write'];
        draft['read']['ledger'] = null;
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

    [GET_LEDGER_SUCCESS]: (state, { payload: ledger }) =>
      produce(state, draft => {
        draft['write']['id'] = ledger._id;
        draft['write']['type'] = ledger.type;
        draft['write']['category'] = ledger.category;
        draft['write']['title'] = ledger.title;
        draft['write']['place'] = ledger.place;
        draft['write']['amount'] = ledger.amount;

        draft['read']['ledger'] = ledger;
      }),

    [GET_LEDGER_FAILURE]: (state, { payload: readError }) =>
      produce(state, draft => {
        draft['read']['ledger'] = null;
        draft['read']['readError'] = readError;
      }),

    [UPDATE_LEDGER_SUCCESS]: (state, { payload: ledger }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = ledger;
        draft['write']['writeError'] = null;
      }),
    [UPDATE_LEDGER_FAILURE]: (state, { payload: writeError }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = null;
        draft['write']['writeError'] = writeError;
      }),
  },
  initialState,
);

export default ledger;

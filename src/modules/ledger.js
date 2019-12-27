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
const SETSELECTEDTYPE = 'ledger/SETSELECTEDTYPE';
const SET_PERIOD = 'date/SET_PERIOD';

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

const [
  REMOVE_LEDGER,
  REMOVE_LEDGER_SUCCESS,
  REMOVE_LEDGER_FAILURE,
] = createRequestActionTypes('ledger/REMOVE_LEDGER');

const [
  LEDGER_ANALYSIS,
  LEDGER_ANALYSIS_SUCCESS,
  LEDGER_ANALYSIS_FAILURE,
] = createRequestActionTypes('ledger/LEDGER_ANALYSIS');

export const initialField = createAction(INITIAL_FIELD);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ selectedType, name, value }) => ({
    selectedType,
    name,
    value,
  }),
);
export const emptyLedger = createAction(EMPTYLEDGER);
export const setSelectedType = createAction(SETSELECTEDTYPE, value => value);
export const setPeriod = createAction(SET_PERIOD, ({ period }) => ({
  period,
}));

export const addLedger = createAction(
  ADD_LEDGER,
  ({ type, category, title, place, amount, date, use, user }) => ({
    type,
    category,
    title,
    place,
    amount,
    date,
    use,
    user,
  }),
);

export const ledgerList = createAction(
  LEDGERLIST,
  ({ pageNum, userId, period }) => ({
    pageNum,
    userId,
    period,
  }),
);

export const getLedger = createAction(GET_LEDGER, ({ id }) => ({ id }));
export const updateLedger = createAction(
  UPDATE_LEDGER,
  ({ id, type, category, title, place, amount, date, user }) => ({
    id,
    type,
    category,
    title,
    place,
    amount,
    date,
    user,
  }),
);

export const removeLedger = createAction(REMOVE_LEDGER, ({ idArr }) => ({
  idArr,
}));

export const ledgerAnalysis = createAction(
  LEDGER_ANALYSIS,
  ({ userId, period }) => ({
    userId,
    period,
  }),
);

const addLedgerSaga = createRequestSaga(ADD_LEDGER, ledgerAPI.addLedger);
const ledgerListSaga = createRequestSaga(LEDGERLIST, ledgerAPI.listLedgers);
const getLedgerSaga = createRequestSaga(GET_LEDGER, ledgerAPI.getLedger);
const updateLedgerSaga = createRequestSaga(
  UPDATE_LEDGER,
  ledgerAPI.updateLedger,
);
const removeLedgerSaga = createRequestSaga(
  REMOVE_LEDGER,
  ledgerAPI.removeLedger,
);
const ledgerAnalysisSaga = createRequestSaga(
  LEDGER_ANALYSIS,
  ledgerAPI.analysis,
);

export function* ledgerSaga() {
  yield takeLatest(ADD_LEDGER, addLedgerSaga);
  yield takeLatest(LEDGERLIST, ledgerListSaga);
  yield takeLatest(GET_LEDGER, getLedgerSaga);
  yield takeLatest(UPDATE_LEDGER, updateLedgerSaga);
  yield takeLatest(REMOVE_LEDGER, removeLedgerSaga);
  yield takeLatest(LEDGER_ANALYSIS, ledgerAnalysisSaga);
}

const initialState = {
  write: {
    expense: {
      id: '',
      type: 'expense',
      category: '',
      title: '',
      place: '',
      amount: '',
      date: '',
      use: 'Y',
    },
    income: {
      id: '',
      type: 'income',
      category: '',
      title: '',
      place: '',
      amount: '',
      date: '',
      use: 'Y',
    },
    selectedType: 'expense',
    writeResult: null,
    writeError: null,
    updateResult: null,
    updateError: null,
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

  remove: {
    removeResult: null,
    removeError: null,
  },

  period: '',

  analysis: {
    expense: null,
    income: null,
    sum: null,
    error: null,
  },
};

const ledger = handleActions(
  {
    [INITIAL_FIELD]: state => ({
      ...state,
    }),
    [CHANGE_FIELD]: (state, { payload: { selectedType, name, value } }) =>
      produce(state, draft => {
        draft['write'][selectedType][name] = value;
      }),

    [EMPTYLEDGER]: state =>
      produce(state, draft => {
        draft['write'] = initialState['write'];
        draft['read']['ledger'] = null;
      }),

    [SETSELECTEDTYPE]: (state, { payload: value }) =>
      produce(state, draft => {
        draft['write']['selectedType'] = value;
      }),

    [SET_PERIOD]: (state, { payload: { period } }) =>
      produce(state, draft => {
        draft['period'] = period;
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

    [GET_LEDGER_SUCCESS]: (state, { payload: ledger }) => {
      const localizedDate = ledger.date.substring(0, 10);

      return produce(state, draft => {
        draft['write'][ledger.type]['id'] = ledger._id;
        draft['write'][ledger.type]['type'] = ledger.type;
        draft['write'][ledger.type]['category'] = ledger.category;
        draft['write'][ledger.type]['title'] = ledger.title;
        draft['write'][ledger.type]['place'] = ledger.place;
        draft['write'][ledger.type]['amount'] = ledger.amount;
        draft['write'][ledger.type]['date'] = localizedDate;
        draft['write'][ledger.type]['use'] = ledger.use;

        draft['write']['selectedType'] = ledger.type;

        draft['read']['ledger'] = ledger;
      });
    },
    [GET_LEDGER_FAILURE]: (state, { payload: readError }) =>
      produce(state, draft => {
        draft['read']['ledger'] = null;
        draft['read']['readError'] = readError;
      }),

    [UPDATE_LEDGER_SUCCESS]: (state, { payload: ledger }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = null;
        draft['write']['writeError'] = null;
        draft['write']['updateResult'] = ledger;
        draft['write']['updateError'] = null;
      }),
    [UPDATE_LEDGER_FAILURE]: (state, { payload: updateError }) =>
      produce(state, draft => {
        draft['write']['writeResult'] = null;
        draft['write']['writeError'] = null;
        draft['write']['updateResult'] = null;
        draft['write']['updateError'] = updateError;
      }),

    [REMOVE_LEDGER_SUCCESS]: (state, { payload: removed }) =>
      produce(state, draft => {
        draft['remove']['removeResult'] = removed;
        draft['remove']['removeError'] = null;
      }),
    [REMOVE_LEDGER_FAILURE]: (state, { payload: removeError }) =>
      produce(state, draft => {
        draft['remove']['removeResult'] = null;
        draft['remove']['removeError'] = removeError;
      }),

    [LEDGER_ANALYSIS_SUCCESS]: (
      state,
      { payload: { expense, income, sumResult } },
    ) =>
      produce(state, draft => {
        draft['analysis']['expense'] = expense;
        draft['analysis']['income'] = income;
        draft['analysis']['sum'] = sumResult;
        draft['analysis']['error'] = null;
      }),

    [LEDGER_ANALYSIS_FAILURE]: (state, { payload: error }) =>
      produce(state, draft => {
        draft['analysis']['expense'] = null;
        draft['analysis']['income'] = null;
        draft['analysis']['sum'] = null;
        draft['analysis']['error'] = error;
      }),
  },
  initialState,
);

export default ledger;

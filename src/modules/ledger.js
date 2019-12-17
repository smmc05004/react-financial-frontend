import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ledgerAPI from '../lib/api/ledger';
import { takeLatest } from 'redux-saga/effects';
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
  type: '',
  category: '',
  title: '',
  place: '',
  amount: '',

  ledger: null,
  ledgerError: null,

  ledgers: null,
  ledgersError: null,
};

const ledger = handleActions(
  {
    [INITIAL_FIELD]: state => ({
      ...state,
    }),
    [CHANGE_FIELD]: (state, { payload: { name, value } }) => ({
      ...state,
      [name]: value,
    }),

    [ADD_LEDGER_SUCCESS]: (state, { payload: ledger }) => ({
      ...state,
      ledger,
    }),
    [ADD_LEDGER_FAILURE]: (state, { payload: ledgerError }) => {
      console.error('에러 발생: ', ledgerError);
      return { ...state, ledger: null, ledgerError };
    },

    [LEDGERLIST_SUCCESS]: (state, { payload: ledgers }) => {
      console.log('성공: ', ledgers);
      return { ...state, ledgers };
    },

    [LEDGERLIST_FAILURE]: (state, { payload: ledgersError }) => {
      console.log('실패: ', ledgersError);
      return {
        ...state,
        ledgers: null,
        ledgersError,
      };
    },
  },
  initialState,
);

export default ledger;

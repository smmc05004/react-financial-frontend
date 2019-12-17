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

export const initialField = createAction(INITIAL_FIELD);
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}));
export const addLedger = createAction(
  ADD_LEDGER,
  ({ type, category, title, place, amount, user }) => {
    console.log(
      '서버로 보낼 파라미터: ',
      type,
      category,
      title,
      place,
      amount,
      user,
    );
    return {
      type,
      category,
      title,
      place,
      amount,
      user,
    };
  },
);
const addLedgerSaga = createRequestSaga(ADD_LEDGER, ledgerAPI.addLedger);

export function* ledgerSaga() {
  yield takeLatest(ADD_LEDGER, addLedgerSaga);
}

const initialState = {
  type: '',
  category: '',
  title: '',
  place: '',
  amount: '',
  ledger: null,
  ledgerError: null,
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
  },
  initialState,
);

export default ledger;

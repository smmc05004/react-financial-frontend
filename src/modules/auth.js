import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_VALUE = 'auth/CHANGE_VALUE';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

export const initializeForm = createAction(INITIALIZE_FORM, type => type);
export const changeValue = createAction(
  CHANGE_VALUE,
  ({ type, key, value }) => ({
    type,
    key,
    value,
  }),
);

export const register = createAction(
  REGISTER,
  ({ userName, userId, password }) => ({
    userName,
    userId,
    password,
  }),
);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
  register: {
    userName: '',
    userId: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userId: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: type }) => ({
      ...state,
      [type]: initialState[type],
    }),

    [CHANGE_VALUE]: (state, { payload: { type, key, value } }) =>
      produce(state, draft => {
        draft[type][key] = value;
      }),

    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;

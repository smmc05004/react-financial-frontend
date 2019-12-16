import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_VALUE = 'auth/CHANGE_VALUE';
const CHANGE_ERRORR = 'auth/CHANGE_ERRORR';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
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

export const changeError = createAction(
  CHANGE_ERRORR,
  ({ name, result, msg }) => ({
    name,
    result,
    msg,
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

export const login = createAction(LOGIN, ({ userId, password }) => ({
  userId,
  password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    userName: '',
    userId: '',
    password: '',
    passwordConfirm: '',
  },
  registerErr: {
    userNameErr: [false, ''],
    userIdErr: [false, ''],
    passwordErr: [false, ''],
    passwordConfirmErr: [false, ''],
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

    [CHANGE_ERRORR]: (state, { payload: { name, result, msg } }) => {
      const errName = `${name}Err`;
      return produce(state, draft => {
        draft['registerErr'][errName] = [result, msg];
      });
    },
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;

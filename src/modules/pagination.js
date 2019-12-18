import { createAction, handleActions } from 'redux-actions';

const SETPAGENATION = 'page/SETPAGENATION';
const SETCURRENTPAGE = 'page/SETCURRENTPAGE';

export const setPagenation = createAction(
  SETPAGENATION,
  ({ currentPage, startPage, endPage, lastPage }) => ({
    currentPage,
    startPage,
    endPage,
    lastPage,
  }),
);

export const setCurrentPage = createAction(
  SETCURRENTPAGE,
  ({ currentPage }) => ({ currentPage }),
);

const initialState = {
  count: 10,
  block: 10,
  currentPage: 1,
  startPage: 0,
  endPage: 0,
  lastPage: 0,
};

const pagenation = handleActions(
  {
    [SETPAGENATION]: (
      state,
      { payload: { currentPage, startPage, endPage, lastPage } },
    ) => ({
      ...state,
      currentPage,
      startPage,
      endPage,
      lastPage,
    }),
    [SETCURRENTPAGE]: (state, { payload: { currentPage } }) => ({
      ...state,
      currentPage,
    }),
  },
  initialState,
);

export default pagenation;

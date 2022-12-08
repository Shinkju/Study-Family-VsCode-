import { handleActions, createActions } from 'redux-actions';

const initialState = [];

export const GET_LECTURELIST = 'professor/GET_LECTURELIST'
export const GET_STUDENTLIST = 'professor/GET_STUDENTLIST';

const actions = createActions({
  [GET_LECTURELIST]: () => {},
  [GET_STUDENTLIST]: () => {}
});

const professorReducer = handleActions(
  {
    [GET_LECTURELIST]: (state, { payload }) => {
      return payload;
    },
    [GET_STUDENTLIST]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default professorReducer;
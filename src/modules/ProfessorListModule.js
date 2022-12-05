import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PROFESSOR = 'professor/GET_PROFESSOR';
export const GET_PROFESSORS = 'professor/GET_PROFESSORS';
export const POST_PROFESSOR = 'professor/POST_PROFESSOR';
export const PUT_PROFESSOR = 'professor/PUT_PROFESSOR';
export const GET_LECTURE = 'professor/GET_LECTURE';

const actions = createActions({
    [GET_PROFESSOR]: () => {},
    [GET_PROFESSORS]: () => {},
    [POST_PROFESSOR]: () => {},
    [PUT_PROFESSOR]: () => {},
    [GET_LECTURE]: () => {},
});

/* 리듀서 */
const professorListReducer = handleActions (
    {
        [GET_PROFESSOR] : (state, { payload }) => {
            return payload;
        },
        [GET_PROFESSORS] : (state, { payload }) => {
            return payload;
        },
        [POST_PROFESSOR] : (state, { payload }) => {
            return payload;
        },
        [PUT_PROFESSOR] : (state, { payload }) => {
            return payload;
        },
        [GET_LECTURE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default professorListReducer;
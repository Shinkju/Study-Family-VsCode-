import { handleActions } from "redux-actions";
import { createActions } from "redux-actions";

const initialState = [];

export const GET_STUDENT = 'lecture/GET_STUDENT';
export const GET_PROFESSOR = 'lecture/GET_PROFESSOR';
export const GET_STUDENT_LECTURE = 'lecture/GET_STUDENT_LECTURE';
export const GET_PROFESSOR_LECTURE = 'lecture/GET_PROFESSOR_LECTURE';
export const POST_LECTURES = 'lecture/POST_LECTURES';
export const PUT_LECTURES = 'lecture/PUT_LECTURES';
export const POST_TASKS = 'lecture/POST_TASKS';
export const PUT_TASKS = 'lecture/PUT_TASKS';

const actions = createActions({
    [GET_STUDENT]: () => {},
    [GET_PROFESSOR]: () => {},
    [GET_STUDENT_LECTURE]: () => {},
    [GET_PROFESSOR_LECTURE]: () => {},
    [POST_LECTURES]: () => {},
    [PUT_LECTURES]: () => {},
    [POST_TASKS]: () => {},
    [PUT_TASKS]: () => {},
});

const lectureReducer = handleActions(
    {
        [GET_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [GET_PROFESSOR] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENT_LECTURE] : (state, { payload }) => {
            return payload;
        },
        [GET_PROFESSOR_LECTURE] : (state, { payload }) => {
            return payload;
        },
        [POST_LECTURES] : (state, { payload }) => {
            return payload;
        },
        [POST_TASKS] : (state, { payload }) => {
            return payload;
        },
        [PUT_TASKS] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default lectureReducer;
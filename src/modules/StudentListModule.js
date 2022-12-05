import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STUDENT = 'student/GET_STUDENT';
export const GET_STUDENTS = 'student/GET_STUDENTS';
export const POST_STUDENT = 'student/POST_STUDENT';
export const PUT_STUDENT = 'student/PUT_STUDENT';
export const GET_LECTURE = 'student/GET_LECTURE';

const actions = createActions({
    [GET_STUDENT]: () => {},
    [GET_STUDENTS]: () => {},
    [POST_STUDENT]: () => {},
    [PUT_STUDENT]: () => {},
    [GET_LECTURE]: () => {},
});

/* 리듀서 */
const studentListReducer = handleActions (
    {
        [GET_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [GET_STUDENTS] : (state, { payload }) => {
            return payload;
        },
        [POST_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [PUT_STUDENT] : (state, { payload }) => {
            return payload;
        },
        [GET_LECTURE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default studentListReducer;
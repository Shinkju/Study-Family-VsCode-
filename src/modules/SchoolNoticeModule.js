import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SCHOOLNOTICE = 'board/GET_SCHOOLNOTICE';
export const GET_SCHOOLNOTICES = 'board/GET_SCHOOLNOTICES';
export const POST_SCHOOLNOTICE = 'board/POST_SCHOOLNOTICE';
export const PUT_SCHOOLNOTICE = 'board/PUT_SCHOOLNOTICE';

const actions = createActions({
    [GET_SCHOOLNOTICE]: () => {},
    [GET_SCHOOLNOTICES]: () => {},
    [POST_SCHOOLNOTICE]: () => {},
    [PUT_SCHOOLNOTICE]: () => {},
});

/* 리듀서 */
const schoolNoticeReducer = handleActions (
    {
        [GET_SCHOOLNOTICE] : (state, { payload }) => {
            return payload;
        },
        [GET_SCHOOLNOTICES] : (state, { payload }) => {
            return payload;
        },
        [POST_SCHOOLNOTICE] : (state, { payload }) => {
            return payload;
        },
        [PUT_SCHOOLNOTICE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default schoolNoticeReducer;
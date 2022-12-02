import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SUBNOTICES = 'subnotice/GET_SUBNOTICES';
export const GET_SUBNOTICE = 'subnotice/GET_SUBNOTICE';
export const POST_SUBNOTICE = 'subnotice/POST_SUBNOTICE';
export const PUT_SUBNOTICE = 'subnotice/PUT_SUBNOTICE';
export const DELETE_SUBNOTICE = 'subnotice/DELETE_SUBNOTICE';

const actions = createActions({
    [GET_SUBNOTICES]: () => {},
    [GET_SUBNOTICE]: () => {},
    [POST_SUBNOTICE]: () => {},
    [PUT_SUBNOTICE]: () => {},
    [DELETE_SUBNOTICE]: () => {}
});

/* 리듀서 */
const subnoticeReducer = handleActions(
    {
        [GET_SUBNOTICES] : (state, { payload }) => {
            return payload;
        },
        [GET_SUBNOTICE] : (state, { payload }) => {
            return payload;
        },
        [POST_SUBNOTICE] : (state, { payload }) => {
            return payload;
        },
        [PUT_SUBNOTICE] : (state, { payload }) => {
            return payload;
        },
        [DELETE_SUBNOTICE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default subnoticeReducer;
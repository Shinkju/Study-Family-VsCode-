import { handleActions, createActions } from "redux-actions";


const initialState = [];

export const GET_APPCLASSMYLIST    = 'appClass/GET_APPCLASSMYLIST';
export const POST_APPCLASS    = 'appClass/POST_APPCLASS';
export const DELETE_APPCLASS    = 'appClass/DELETE_APPCLASS';
export const GET_STUDENT    = 'lecture/GET_STUDENT';

const actions = createActions({
    [GET_STUDENT]: () => {},
    [GET_APPCLASSMYLIST]: () => {},
    [POST_APPCLASS]: () => {},
    [DELETE_APPCLASS]: () => {}
});

const appClassReducer = handleActions(
    {
        [GET_STUDENT]: (state, { payload }) => {

            return payload;
        },
        [GET_APPCLASSMYLIST]: (state, { payload }) => {

            return payload;
        },
        [POST_APPCLASS]: (state, { payload }) => {

            return payload;
        },
        [DELETE_APPCLASS]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default appClassReducer;
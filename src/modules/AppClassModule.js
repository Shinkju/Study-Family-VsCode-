import { handleActions, createActions } from "redux-actions";


const initialState = [];

export const GET_AppClass    = 'appClass/GET_AppClass';
export const POST_AppClass    = 'appClass/POST_AppClass';
export const DELETE_AppClass    = 'appClass/DELETE_AppClass';

const actions = createActions({
    [GET_AppClass]: () => {},
    [POST_AppClass]: () => {},
    [DELETE_AppClass]: () => {}
});

const appClassReducer = handleActions(
    {
        [GET_AppClass]: (state, { payload }) => {

            return payload;
        },
        [POST_AppClass]: (state, { payload }) => {

            return payload;
        },
        [DELETE_AppClass]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default appClassReducer;
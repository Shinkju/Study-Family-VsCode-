import { handleActions, createActions } from "redux-actions";


const initialState = [];

export const GET_MESSAGE_RECEIV = 'msg/GET_MESSAGE_RECEIV';
export const GET_MESSAGE_SEND = 'msg/GET_MESSAGE_SENDER';
export const POST_MESSAGE_SEND = 'msg/POST_MESSAGE_SEND';
export const GET_RECEIVER = 'msg/GET_RECEIVER';


const action = createActions({
    [GET_MESSAGE_RECEIV]: () => {},
    [GET_MESSAGE_SEND]: () => {},
    [POST_MESSAGE_SEND]: () => {},
    [GET_RECEIVER]: () => {}
});

const msgReducer = handleActions(
    {
        [GET_MESSAGE_RECEIV]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MESSAGE_SEND]: (state, { payload }) => {
            
            return payload;
        },
        [POST_MESSAGE_SEND]: (state, { payload }) => {
            
            return payload;
        },
        [GET_RECEIVER]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default msgReducer;
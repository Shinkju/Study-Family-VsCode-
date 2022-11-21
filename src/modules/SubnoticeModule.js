import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SUBNOTICE = 'subnotice/GET_SUBNOTICE';

const actions = createActions({
    [GET_SUBNOTICE]: () => {},
});

/* 리듀서 */
const subnoticeReducer = handleActions(
    {
        [GET_SUBNOTICE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default subnoticeReducer;
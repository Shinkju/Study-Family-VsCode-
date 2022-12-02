import { handleActions, createActions } from "redux-actions";

const initialState = [];

export const GET_SUBPLAN    = 'subPlan/GET_SUBPLAN';
export const POST_SUBPLAN    = 'subPlan/POST_SUBPLAN';

const actions = createActions({
    [GET_SUBPLAN]: () => {},
    [POST_SUBPLAN]: () => {}
});

const subPlanReducer = handleActions(
    {
        [GET_SUBPLAN]: (state, { payload }) => {

            return payload;
        },
        [POST_SUBPLAN]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
);

export default subPlanReducer;

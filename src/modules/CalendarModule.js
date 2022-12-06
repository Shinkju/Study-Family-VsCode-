import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_CALENDARS = 'calendar/GET_CALENDARS';
export const GET_CALENDAR = 'calendar/GET_CALENDAR';
export const POST_CALENDAR = 'calendar/POST_CALENDAR';
export const PUT_CALENDAR = 'calendar/PUT_CALENDAR';
export const DELETE_CALENDAR = 'calendar/DELETE_CALENDAR';

const actions = createActions({
    [GET_CALENDARS]: () => {},
    [GET_CALENDAR]: () => {},
    [POST_CALENDAR]: () => {},
    [PUT_CALENDAR]: () => {},
    [DELETE_CALENDAR]: () => {}
});

const calendarReducer = handleActions(
    {
        [GET_CALENDARS] : (state, {payload}) => { return payload; },

        [GET_CALENDAR] : (state, {payload}) => { return payload; },

        [POST_CALENDAR] : (state, {payload}) => { return payload; },

        [PUT_CALENDAR] : (state, {payload}) => { return payload; },

        [DELETE_CALENDAR] : (state, {payload}) => { return payload; },
    },
    initialState
);

export default calendarReducer;
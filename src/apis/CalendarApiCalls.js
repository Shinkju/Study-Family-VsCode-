import { GET_CALENDARS, GET_CALENDAR, POST_CALENDAR, PUT_CALENDAR, DELETE_CALENDAR } from "../modules/CalendarModule";

export const callCalendarViewApi = ({}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendarView`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarApiCalls] callCalendarViewApi result : ', result);
            dispatch({ type: GET_CALENDARS, payload: result.data });
        }

    }

}

export const callCalendarSelectApi = ({calendarCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendarView/${calendarCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarApiCalls] callCalendarSelectApi result : ', result);
            dispatch({ type: GET_CALENDAR, payload: result.data})
        }
    }
}

export const callCalendarUpdateApi = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendarView`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarApiCalls] callCalendarUpdateApi result : ', result);
            dispatch({ type: PUT_CALENDAR, payload: result.data})
        }
    }
}

export const callCalendarDeleteApi = ({calendarCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendarView/${calendarCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarApiCalls] callScheduleDeleteApi result : ', result);
            dispatch({ type: DELETE_CALENDAR, payload: result.data })
        }
    }
}

export const callCalendarInsertApi = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/calendarView`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarApiCalls] callCalendarInsertApi result : ', result);
            dispatch({ type: POST_CALENDAR, payload: result.data })
        }
    }
}
import { GET_AppClass, POST_AppClass, DELETE_AppClass } from "../modules/AppClassModule";

    /* 수강리스트 */
    export const callAppClassListAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass/list`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
            })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AppClassAPICalls] callAppClassListAPI result : ', result);

            dispatch({ type: GET_AppClass, payload: result });
        }
    }
}

    /* 수강신청 */
    export const callAppClassAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass/go`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                lecture : {
                    lectureCode : form.lectureCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AppClassAPICalls] callAppClassAPI result : ', result);

            dispatch({ type: POST_AppClass, payload: result.data });
        }
    }
}

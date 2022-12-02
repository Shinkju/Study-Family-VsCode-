import { GET_SUBNOTICE, GET_SUBNOTICES, POST_SUBNOTICE, PUT_SUBNOTICE, DELETE_SUBNOTICE } from "../modules/SubnoticeModule";

/* 공지 조회 */
export const callSubnoticeListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/board/subnotices?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubnoticeAPICalls] callSubnoticeListAPI result : ', result);
            dispatch({ type: GET_SUBNOTICES, payload: result.data });
        }
    }

}

/* 공지 상세 조회 */
export const callSubnoticeDetailAPI = ({subnoticeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/board/subnotices/${subnoticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubnoticeAPICalls] callSubnoticeDetailAPI result : ', result);
            dispatch({ type: GET_SUBNOTICE, payload: result });
        }
    }

}

/* 공지 작성 */
export const callSubnoticeWriteAPI = ({form}) => {
    console.log('[SubnoticeAPICalls] form 넘어오나? : ', form);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/board/subnotices/make`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                lecture : {
                    lectureCode : form.lectureCode
                },
                subnoticeTitle : form.subnoticeTitle,
                content : form.content
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubnoticeAPICalls] callSubnoticeWriteAPI result : ', result);
            dispatch({ type: POST_SUBNOTICE, payload: result });
        }
    }

}

/* 공지 수정 */
export const callSubnoticeUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/board/subnotices/make`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                subnoticeCode : form.subnoticeCode,
                subnoticeTitle : form.subnoticeTitle,
                content : form.content
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubnoticeAPICalls] callSubnoticeUpdateAPI result : ', result);
            dispatch({ type: PUT_SUBNOTICE, payload: result });
        }
    }

}

/* 공지 삭제 */
export const callSubnoticeDeleteAPI = ({ form }) => {
    console.log('[SubnoticeAPICalls] subnoticeCode 공지 삭제 넘어오나? : ', form.subnoticeCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/board/subnotices/delete/${form.subnoticeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubnoticeAPICalls] callSubnoticeDeleteAPI result : ', result);
            dispatch({ type: DELETE_SUBNOTICE, payload: result });
        }
    }

}

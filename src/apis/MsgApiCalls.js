import { GET_MESSAGE_RECEIV, GET_MESSAGE_SEND, POST_MESSAGE_SEND, GET_RECEIVER } from '../modules/MsgModule';


/* 메세지 수신함 조회 API */
export const callReceivedBoxAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/message/receive?page=${currentPage}`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[MsgApiCalls] callReceivedBoxAPI RESULT : ', result.data);
            dispatch({ type: GET_MESSAGE_RECEIV, payload : result.data });
        }
    }

}


/* 메세지 발신함 조회 API */
export const callSendBoxAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/message/send?page=${currentPage}`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[MsgApiCalls] callSendBoxAPI RESULT : ', result.data);
            dispatch({ type: GET_MESSAGE_SEND, payload : result.data });
        }
    }

}


/* 쪽지 발송 API */
export const callSendMsgAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/message/send`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : form

        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MsgApiCalls] callSendMsgAPI result : ', result);

            dispatch({ type: POST_MESSAGE_SEND, payload: result });
        }
    }

}



/* 수신자 목록 조회 API */
export const callReceiverAPI = ({lectureCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/studentlist/${lectureCode}`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[MsgApiCalls] callReceiverAPI RESULT : ', result.data);
            dispatch({ type: GET_RECEIVER, payload : result.data });
        }
    }

}
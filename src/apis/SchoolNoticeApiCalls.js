import { GET_SCHOOLNOTICE, GET_SCHOOLNOTICES, POST_SCHOOLNOTICE, PUT_SCHOOLNOTICE } from "../modules/SchoolNoticeModule";

export const callSchoolNoticeListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/schoolnotice?page=${currentPage}`;

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
            console.log('[SchoolNoticeAPICalls] callSchoolNoticeListAPI result : ', result);
            dispatch({ type: GET_SCHOOLNOTICES, payload: result.data });
        }
    }

}


export const callSchoolNoticeDetailAPI = ({schoolNoticeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/schoolnotice/${schoolNoticeCode}`;

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

        if(result.status === 200) {
            console.log('[SchoolNoticeAPICalls] callSchoolNoticeDetailAPI RESULT : ', result);
            dispatch({ type: GET_SCHOOLNOTICE, payload : result.data });
        }
    }
}

export const callSchoolNoticeUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/schoolnotice`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                schoolNoticeTitle : form.schoolNoticeTitle,
                schoolNoticeContent : form.schoolNoticeContent,
                schoolNoticeCategory : form.schoolNoticeCategory,
                department : {
                    departmentCode : form.departmentCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SchoolNoticeAPICalls] callSchoolNoticeUpdateAPI result : ', result);

            dispatch({ type: PUT_SCHOOLNOTICE, payload: result });
        }
    }

}

export const callSchoolNoticeRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/schoolnotice`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                schoolNoticeTitle : form.schoolNoticeTitle,
                schoolNoticeContent : form.schoolNoticeContent,
                schoolNoticeRegDate : form.schoolNoticeRegDate,
                schoolNoticeState : form.schoolNoticeState,
                schoolNoticeCategory : form.schoolNoticeCategory,
                department : {
                    departmentCode : form.departmentCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SchoolNoticeAPICalls] callSchoolNoticeRegistAPI result : ', result);

            dispatch({ type: POST_SCHOOLNOTICE, payload: result });
        }
    }

}

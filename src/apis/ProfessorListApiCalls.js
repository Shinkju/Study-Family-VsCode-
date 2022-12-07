import { GET_PROFESSOR, GET_PROFESSORS, POST_PROFESSOR, PUT_PROFESSOR } from "../modules/ProfessorListModule";

export const callProfessorListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor-management?page=${currentPage}`;

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
            console.log('[ProfessorListAPICalls] callProfessorListForAdminAPI result : ', result);
            dispatch({ type: GET_PROFESSORS, payload: result.data });
        }
    }

}


export const callProfessorDetailAPI = ({professorCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professorlist/${professorCode}`;

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
            console.log('[ProfessorListAPICalls] callProfessorDetailAPI RESULT : ', result);
            dispatch({ type: GET_PROFESSOR, payload : result.data });
        }
    }
}


export const callProfessorDetailForAdminAPI = ({professorCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professorlist/${professorCode}`;

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
            console.log('[ProfessorListAPICalls] callProfessorDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_PROFESSOR, payload : result.data });
        }
    }
}


export const callProfessorRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                professorName : form.professorName,
                professorPosition : form.professorPosition,
                professorHireDate : form.professorHireDate,
                professorRegistNum : form.professorRegistNum,
                professorPhone : form.professorPhone,
                professorAddress : form.professorAddress,
                professorStatus : form.professorStatus,
                professorEmail : form.professorEmail,
                department : {
                    departmentCode : form.departmentCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ProfessorListAPICalls] callProfessorRegistAPI result : ', result);

            dispatch({ type: POST_PROFESSOR, payload: result });
        }
    }

}



export const callProfessorUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                professorCode : form.professorCode,
                professorName : form.professorName,
                professorPosition : form.professorPosition,
                professorHireDate : form.professorHireDate,
                professorRegistNum : form.professorRegistNum,
                professorPhone : form.professorPhone,
                professorAddress : form.professorAddress,
                professorStatus : form.professorStatus,
                professorEmail : form.professorEmail,
                department : {
                    departmentCode : form.departmentCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ProfessorListAPICalls] callProfessorUpdateAPI result : ', result);

            dispatch({ type: PUT_PROFESSOR, payload: result });
        }
    }

}
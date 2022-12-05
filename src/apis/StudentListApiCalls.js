import { GET_STUDENT, GET_STUDENTS, POST_STUDENT, PUT_STUDENT } from "../modules/StudentListModule";

export const callStudentListForAdminAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student-management?page=${currentPage}`;

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
            console.log('[StudentListAPICalls] callStudentListForAdminAPI result : ', result);
            dispatch({ type: GET_STUDENTS, payload: result.data });
        }
    }

}


export const callStudentDetailAPI = ({studentNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/studentlist/${studentNo}`;

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
            console.log('[StudentListAPICalls] callStudentDetailAPI RESULT : ', result);
            dispatch({ type: GET_STUDENT, payload : result.data });
        }
    }
}


export const callStudentDetailForAdminAPI = ({studentNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/studentlist/${studentNo}`;

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
            console.log('[StudentAPICalls] callStudentDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_STUDENT, payload : result.data });
        }
    }
}

export const callStudentRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                studentNo : form.studentNo,
                studentCode : form.studentCode,
                studentName : form.studentName,
                admissionsDay : form.admissionsDay,
                department : {
                    departmentCode : form.departmentCode
                },
                studentRegistNum : form.studentRegistNum,
                grade : form.grade,
                gender : form.gender,
                studentEmail : form.studentEmail,
                studentPhone : form.studentPhone,
                studentAddress : form.studentAddress,
                nationality : form.nationality,
                schoolStatus : {
                    schoolStatusCode : form.schoolStatusCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[StudentListAPICalls] callStudentRegistAPI result : ', result);

            dispatch({ type: POST_STUDENT, payload: result });
        }
    }

}


export const callStudentUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                studentNo : form.studentNo,
                studentCode : form.studentCode,
                studentName : form.studentName,
                admissionsDay : form.admissionsDay,
                department : {
                    departmentCode : form.departmentCode
                },
                studentRegistNum : form.studentRegistNum,
                grade : form.grade,
                gender : form.gender,
                studentEmail : form.studentEmail,
                studentPhone : form.studentPhone,
                studentAddress : form.studentAddress,
                nationality : form.nationality,
                schoolStatus : {
                    schoolStatusCode : form.schoolStatusCode
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[StudentListAPICalls] callStudentUpdateAPI result : ', result);

            dispatch({ type: PUT_STUDENT, payload: result });
        }
    }

}
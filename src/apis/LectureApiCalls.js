import { GET_STUDENT, GET_PROFESSOR, GET_STUDENT_LECTURE, GET_PROFESSOR_LECTURE, POST_LECTURES, PUT_LECTURES, POST_TASKS, PUT_TASKS, GET_APPCLASS_LIST } from '../modules/LectureModule';


/* 학생의 강의 리스트 불러오는 API */
export const callLectureStuListAPI = ({studentNo}) => {
    console.log('[AppClassAPICalls] studentNo : ', studentNo);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student/stuLectureList`

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
            console.log('[lLectureApiCalls] callLectureStuListAPI RESULT : ', result);
            dispatch({ type: GET_STUDENT, payload : result });
        }
    }

}


/* 학생의 강의 상세페이지 불러오는 API - lectureCode 사용 */
export const callLectureStuDetailAPI = ({lectureCode}) => {
    console.log('[AppClassAPICalls] lectureCode : ', lectureCode);
   
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student/stuLectureList/${lectureCode}`

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
            console.log('[lLectureApiCalls] callLectureStuDetailAPI RESULT : ', result);
            dispatch({ type: GET_STUDENT_LECTURE, payload : result });
        }
    }

}




/* 교수의 강의 리스트 불러오는 API */
export const callLectureProListAPI = ({professorCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/proLectureList`

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
            console.log('[lLectureApiCalls] callLectureProListAPI RESULT : ', result);
            dispatch({ type: GET_PROFESSOR, payload : result });
        }
    }

}



/* 교수의 상세페이지 불러오는 API - lectureCode 사용 */
export const callLectureProDetailAPI = ({lectureCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/proLectureList/${lectureCode}`

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
            console.log('[lLectureApiCalls] callLectureProDetailAPI RESULT : ', result);
            dispatch({ type: GET_PROFESSOR_LECTURE, payload : result });
        }
    }

}


 /* 수강리스트 */
 export const callAppClassListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass/list?page=${currentPage}`;

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
            console.log('[LectureApiCalls] callAppClassListAPI result : ', result);

            dispatch({ type: GET_APPCLASS_LIST, payload: result.data });
        }
    }
}



/* 교수 수업 파일 등록 API */
export const callRegistFileAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/lectures`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[lLectureApiCalls] callRegistFileAPI result : ', result);
            dispatch({ type: POST_LECTURES, payload: result.data });
        }
    }

}

/* ===================== API 수정 예정 =============================    */
/* 교수 수업 파일 수정을 위한 목록 불러오기 API */
export const callFileInfoDetailAPI = ({lectureCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/proLectureList/${lectureCode}`

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
            console.log('[lLectureApiCalls] callFileInfoDetailAPI result : ', result);
            dispatch({ type: GET_PROFESSOR_LECTURE, payload: result.data });
        }
    }

}


/* 교수 파일 수정하기 API */
export const callProductUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/lectures`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "PUT",
            headers : { 
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json()); 

        if(result.status === 200){ 
            console.log('[lLectureApiCalls] callProductUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_LECTURES, payload : result.data });
        }
    }
}



/* 학생 과제 파일 등록 API */
export const callRegistTaskAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/tasks`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[lLectureApiCalls] callRegistTaskAPI result : ', result);
            dispatch({ type: POST_TASKS, payload: result.data });
        }
    }

}


/* 학생 출결 상태 등록 API */
export const callCourseHistoryAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/courseHistory`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[lLectureApiCalls] callCourseHistoryAPI result : ', result);
            dispatch({ type: POST_LECTURES, payload: result.data });
        }
    }

}

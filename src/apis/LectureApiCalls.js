import { GET_STUDENT, GET_PROFESSOR, GET_STUDENT_LECTURE, GET_PROFESSOR_LECTURE, POST_LECTURES, PUT_LECTURES, POST_TASKS, PUT_TASKS, GET_APPCLASS_LIST } from '../modules/LectureModule';


/* 학생의 강의 리스트 불러오는 API */
export const callLectureStuListAPI = ({studentNo}) => {

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
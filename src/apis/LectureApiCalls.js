import { GET_STUDENT, GET_PROFESSOR, GET_STUDENT_LECTURE, GET_PROFESSOR_LECTURE, POST_LECTURES, PUT_LECTURES, POST_TASKS, PUT_TASKS } from '../modules/LectureModule';


/* 학생의 강의 리스트 불러오는 API */
export const callLectureStuListAPI = ({studentNo, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/student/${studentNo}?page=${currentPage}`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            dispatch({ type: GET_STUDENT, payload : result.data });
        }
    }

}




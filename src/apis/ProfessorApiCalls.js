import { GET_LECTURELIST, GET_STUDENTLIST, PUT_STUDENTLIST } from '../modules/ProfessorModule';

/* 교수 강좌 리스트 API */
export const callProfessorLectureListAPI = ({professorCode}) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/professorLectureList`

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
          console.log('[ProfessorApiCalls] callProfessorLectureListAPI RESULT : ', result);
          dispatch({ type: GET_LECTURELIST, payload : result });
      }
  }

}

/* 해당 강좌 학생 전체 리스트 조회 */
export const callStudentListAPI = ({ lectureCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/studentlist/${lectureCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log('[ProfessorApiCalls] callStudentListAPI result : ', result);
      dispatch({ type: GET_STUDENTLIST, payload: result.data });
    }
  };
};

/* 학생 리스트 - 강좌 평가 */
export const insertLectureEvalAPI = ({ lectureCode, form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/professor/studentlist/${lectureCode}`;

  return async(dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
      body : JSON.stringify({
        lecture : {
          lectureCode : lectureCode
        },
        evalCode : form.evalCode,
        evalMiddle : form.evalMiddle,
        evalFinal : form.evalFinal,
        evalTask : form.evalTask,
        evalAttend : form.evalAttend
      })
    }).then((response) => response.json());

    if(result.status === 200) {
      console.log('[ProfessorApiCalls] insertLectureEvalAPI result : ', result.data);
      dispatch({ type: PUT_STUDENTLIST, payload: result.data });
    }
  }
}
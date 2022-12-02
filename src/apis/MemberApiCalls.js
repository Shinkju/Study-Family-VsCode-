import { POST_LOGIN, POST_PROFESSORREGIST, POST_STUDENTREGIST, POST_REGIST } from "../modules/MemberModule";


/* 로그인 API - Form 형식 */
export const callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/login`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
            body : JSON.stringify({
                loginId: form.loginId,
                loginPassword: form.loginPassword,
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            })
        })
        .then(response => response.json());

        if(result.status === 200){
    
            console.log('[MemberApiCalls] callLoginAPI result : ', result);
            //클라이언트의 localStorage에 로그인 완료 시 토큰 저장
            window.localStorage.setItem('accessToken', result.data.accessToken);
            //상태 메세지 출력 형태
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }

}

/* 교수 회원가입 API */
export const callProfessorRegistAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/professorauth/professorRegist`;

    return async (dispatch, getState) => {

        console.log("ProfessorRegistAPI 진입 확인");  
        
        console.log(form);

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                //"Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                loginId: form.loginId,
                loginPassword: form.loginPassword,
                professor : {
                    professorRegistNum : form.professorRegistNum,
                    professorCode : form.professorCode
                }
            })
        })
        .then(response => response.json());

        console.log('[MemberApiCalls] callProfessorRegistAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_PROFESSORREGIST,  payload: result });
            alert("교수님, 회원가입 완료.");
            window.location = "http://localhost:3000/";
        }
        else{
            alert("교수님, 다시 확인하세요.");
            window.location.reload();
        }

    };
}

/* 학생 회원가입 API */
export const callStudentRegistAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/studentauth/studentRegist`;

    return async (dispatch, getState) => {

        console.log("StudentRegistAPI 진입 확인");

        console.log(form);

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                //"Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                loginId: form.loginId,
                loginPassword: form.loginPassword,
                student : {
                    studentRegistNum : form.studentRegistNum,
                    studentCode : form.studentCode
                }
                
            })
        })
        .then(response => response.json());

        console.log('[MemberApiCalls] callStudentRegistAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_STUDENTREGIST,  payload: result });
            alert("학생, 회원가입 완료");
            window.location = "http://localhost:3000/";
        }
        else{
            alert("학생, 다시 확인하세요.");
            window.location.reload();
        }
    };
}

/* 관리자 회원가입 API */
export const callRegistAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/regist`;

    return async (dispatch, getState) => {

        console.log("RegistAPI 진입 확인");

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                //"Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                loginId: form.loginId,
                loginPassword: form.loginPassword
            }),
            //memberRole : form.memberRole

            memberRole : "ROLE_ADMIN"
        })
        .then(response => response.json());

        console.log('[MemberApiCalls] callRegistAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGIST,  payload: result });
            alert("관리자용 일반 회원가입 완료.");
            window.location = "http://localhost:3000/";
        }
        else{
            alert("관리자님, 다시 확인하세요.");
            window.location.reload();
        }
    };
}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[MEMBERAPICalls] callLogoutAPI result : Finished');

    }

}
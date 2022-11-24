import { POST_LOGIN, POST_REGIST } from "../modules/MemberModule";


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
                loginPassword: form.loginPassword
            })
        })
        .then(response => response.json());

        if(result.status === 200){
            
            //클라이언트의 localStorage에 로그인 완료 시 토큰 저장
            window.localStorage.setItem('accessToken', result.data.accessToken);
            //상태 메세지 출력 형태
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }


}
import { POST_APPCLASS, DELETE_APPCLASS, GET_APPCLASSMYLIST} from "../modules/AppClassModule";

    /* 수강신청 */
    export const callAppClassAPI = (lecture) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                lecture : {
                    lectureCode : lecture.lectureCode
                }
            })
        })
        .then(response => response.json());

       

        if(result.status === 200) {
            console.log('[AppClassAPICalls] callAppClassAPI result : ', result);

            dispatch({ type: POST_APPCLASS, payload: result.data });
        }
    }
}

    /* 수강신청한 목록 */
    export const callAppClassMyListAPI = ({studentNo}) => {
        console.log('[AppClassAPICalls] studentNo : ', studentNo);
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass/${studentNo}`
    
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
                console.log('[AppClassAPICalls] callAppClassMyListAPI RESULT : ', result);
                dispatch({ type: GET_APPCLASSMYLIST, payload : result });
            }
        }
    
    }






    /* 수강취소 */
    export const callAppClassDeleteAPI = (appClassCode) => {

        console.log('[AppClassAPICalls] appClassCode : ', appClassCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/appClass/delete/${appClassCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            })
        .then(response => response.json());
        console.log('[AppClassAPICalls] appClassCode : ', appClassCode);

        if(result.status === 200) {
            console.log('[AppClassAPICalls] callAppClassDeleteAPI result : ', result);
   
            dispatch({ type: DELETE_APPCLASS, payload: result.data });
          
        }
    }
}

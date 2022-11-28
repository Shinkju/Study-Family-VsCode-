import { GET_SUBPLAN, POST_SUBPLAN } from "../modules/SubPlanModule";

export const callSubPlanListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/subPlan/list/${planCode}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubPlanAPICalls] callSubPlanListAPI result : ', result);
            dispatch({ type: GET_SUBPLAN, payload: result.data });
        }
    }

}

export const callSubPlanMakeAPI = (lecture, form) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/subPlan/make`

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
                },
                planName : form.planName,
                purpose : form.purpose
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[SubPlanAPICalls] callSubPlanMakeAPI result : ', result);
            dispatch({ type: POST_SUBPLAN, payload: result.data });
        }
    }

}
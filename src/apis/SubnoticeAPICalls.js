import { GET_SUBNOTICE } from "../modules/SubnoticeModule";

export const callSubnoticeListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/subnotice/list`;

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
            console.log('[SubnoticeAPICalls] callSubnoticeListAPI result : ', result);
            dispatch({ type: GET_SUBNOTICE, payload: result.data });
        }
    }

}
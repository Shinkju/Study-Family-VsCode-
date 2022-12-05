import { handleActions } from "redux-actions";
import { createActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */                  
// export const GET_MEMBER = 'member/GET_MEMBER';
export const POST_LOGIN = 'login/POST_LOGIN';
export const POST_PROFESSORREGIST = 'professorRegist/POST_PROFESSORREGIST';
export const POST_STUDENTREGIST = 'studentRegist/POST_STUDENTREGIST';
export const POST_REGIST = 'member/POST_REGIST';
export const GET_MEMBER = 'info/GET_MEMBER';

/* 액션 함수 생성 */
const actions = createActions({
    // [GET_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_PROFESSORREGIST]: () => {},
    [POST_STUDENTREGIST]: () => {},
    [POST_REGIST]: () => {},
    [GET_MEMBER]: () => {}

});


/* 리듀서 */  //payload = 몸체(데이터)    
//API에서 전달받은 몸체를 가공해 저장소(store)에 저장하는 로직    
const memberReducer = handleActions(
    {
        // [GET_MEMBER] : (state, { payload }) => {
        //     //가공해야 하는 내용은 여기 작성  ex) state = state + 1 ....
        //     return payload;
        // },
        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_PROFESSORREGIST] : (state, { payload }) => {
            return payload;
        },
        [POST_STUDENTREGIST] : (state, { payload }) => {
            return payload;
        },
        [POST_REGIST] : (state, { payload }) => {
            return payload;
        },
        [GET_MEMBER] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);


export default memberReducer;
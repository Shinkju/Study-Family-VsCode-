import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    memberReducer,
    lectureReducer,
    subnoticeReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';
import memberReducer from './MemberModule';
import appClassReducer from "./AppClassModule";

const rootReducer = combineReducers({
    memberReducer,
    lectureReducer,
    subnoticeReducer,
    appClassReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';
import memberReducer from './MemberModule';
import appClassReducer from "./AppClassModule";
import subPlanReducer from "./SubPlanModule";

const rootReducer = combineReducers({
    memberReducer,
    lectureReducer,
    subnoticeReducer,
    appClassReducer,
    subPlanReducer
});

export default rootReducer;
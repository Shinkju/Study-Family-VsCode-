import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';
import memberReducer from './MemberModule';
import appClassReducer from "./AppClassModule";
import subPlanReducer from "./SubPlanModule";
import studentListReducer from "./StudentListModule";
import professorListReducer from "./ProfessorListModule";
import schoolNoticeReducer from "./SchoolNoticeModule";

const rootReducer = combineReducers({
    memberReducer,
    lectureReducer,
    subnoticeReducer,
    appClassReducer,
    subPlanReducer,
    studentListReducer,
    professorListReducer,
    schoolNoticeReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';
import memberReducer from './MemberModule';
import appClassReducer from "./AppClassModule";
import subPlanReducer from "./SubPlanModule";
import studentListReducer from "./StudentListModule";
import professorListReducer from "./ProfessorListModule";
import schoolNoticeReducer from "./SchoolNoticeModule";
import professorReducer from "./ProfessorModule";
import msgReducer from './MsgModule';

const rootReducer = combineReducers({
    memberReducer,
    lectureReducer,
    subnoticeReducer,
    appClassReducer,
    subPlanReducer,
    professorReducer,
    studentListReducer,
    professorListReducer,
    schoolNoticeReducer,
    msgReducer
});

export default rootReducer;
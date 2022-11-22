import { combineReducers } from "redux";
import subnoticeReducer from "./SubnoticeModule";
import lectureReducer from './LectureModule';

const rootReducer = combineReducers({
    lectureReducer,
    subnoticeReducer
});

export default rootReducer;
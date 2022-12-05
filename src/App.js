/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import LectureStuList from './pages/Lecture/LectureStuList';
import LectureProList from './pages/Lecture/LectureProuList';
import LectureStuDetail from './pages/Lecture/LectureStuDetail';
import LectureProDetail from './pages/Lecture/LectureProDetail';
import FileRegistPro from './pages/Lecture/FileRegistPro';
// import FileUpdatePro from './pages/Lecture/FileUpdatePro';
import TaskRegistStu from './pages/Lecture/TaskRegistStu';
import Login from './pages/Member/Login';
import RegistSelect from './pages/Member/RegistSelect';
import ProfessorRegist from './pages/Member/ProfessorRegist';
import StudentRegist from './pages/Member/StudentRegist';
import Regist from './pages/Member/Regist';
import AppClass from './pages/AppClass/AppClass';
import AppClassMyList from './pages/AppClass/AppClassMyList';
import SubPlan from './pages/SubPlan/SubPlan';
import Subnotice from './pages/subnotice/Subnotice';
import SubnoticeDetail from './pages/subnotice/SubnoticeDetail';
import SubnoticeModal from './pages/subnotice/SubnoticeModal';
import StudentManagement from './pages/Student/StudentManagement';
import StudentRegistration from './pages/Student/StudentRegistration';
import ProfessorManagement from './pages/Professor/ProfessorManagement';
import ProfessorRegistration from './pages/Professor/ProfessorRegistration';
import StudentDetail from './pages/Student/StudentDetail';
import ProfessorDetail from './pages/Professor/ProfessorDetail';
import ManagementLayout from './layouts/ManagementLayout';
import SchoolNoticeList from './pages/SchoolNotice/SchoolNoticeList';
import SchoolNoticeDetail from './pages/SchoolNotice/SchoolNoticeDetail';
import SchoolNoticeRegistration from './pages/SchoolNotice/SchoolNoticeRegistration';
import MsgReceiveList from './pages/Message/MsgReceiveList';
import MsgSendedList from './pages/Message/MsgSendedList';
import MsgSend from './pages/Message/MsgSend';
import RceiverModal from './pages/Message/Modal/RceiverModal';


function App() {
  

  return (
    
      <BrowserRouter>
        <Routes>
            {/* 첫 화면에서 나오는 로그인 / 회원가입 화면 */}
            <Route exact path="/" element={ <Login/> }/>
            {/* 회원가입 선택 */}
            <Route path="/registSelect" element={ <RegistSelect/> }/>
            {/* 교수 */}
            <Route path="/professorauth/professorRegist" element={ <ProfessorRegist/> }/>
            {/* 학생 */}
            <Route path="/studentauth/studentRegist" element={ <StudentRegist/> }/>
            {/* 관리자 */}
            <Route path="/auth/regist" element={ <Regist/> }/>

            {/* 레이아웃 픽스 + 하위 페이지 */}
            <Route path="/layout" element={ <Layout/> }>
              <Route path="lectureStuList" element={ <LectureStuList/> }/>
              <Route path="lectureStuDetail/:lectureCode" element={ <LectureStuDetail/> }/>
              <Route path="lectureProList" element={ <LectureProList/> }/>
              <Route path="lectureProDetail/:lectureCode" element={ <LectureProDetail/> }/>
              <Route path="fileRegistPro" element={ <FileRegistPro/> }/>
              {/* <Route path="file-updatePro/:lectureCode" element={ <FileUpdatePro/> }/> */}
              <Route path="taskRegistStu" element={ <TaskRegistStu/> }/>
              <Route path="AppClass" element={ <AppClass/> }/>
              <Route path="AppClassMyList" element={ <AppClassMyList/> }/>
              <Route path="Subnotice" element={ <Subnotice/> }/>
              <Route path="SubnoticeDetail/:subnoticeCode" element={ <SubnoticeDetail/> }/>
              <Route path="SubnoticeModal" element={ <SubnoticeModal/> }/>
              <Route path="msgReceiveList" element={ <MsgReceiveList/> }/>
              <Route path="msgSendedList" element={ <MsgSendedList/> }/>
              <Route path="msgSend" element={ <MsgSend/> }/>
              <Route path="rceiverModal" element={ <RceiverModal/> }/>
            </Route>

            <Route path="/management" element={ <ManagementLayout/> }>
              <Route path="student" element={ <StudentManagement/> }/>
              <Route path="studentdetail/:studentNo" element={ <StudentDetail/> }/>
              <Route path="student-registration" element={ <StudentRegistration/> }/>
              <Route path="professor" element={ <ProfessorManagement/> }/>
              <Route path="professordetail/:professorCode" element={ <ProfessorDetail/> }/>
              <Route path="professor-registration" element={ <ProfessorRegistration/> }/>
            </Route>

            <Route path="/board" element={ <Layout/> }>
              <Route path="schoolnotice" element={ <SchoolNoticeList/> }/>
              <Route path="schoolnoticeDetail/:schoolNoticeCode" element={ <SchoolNoticeDetail/> }/>
              <Route path="schoolnotice-registration" element={ <SchoolNoticeRegistration/> }/>
            </Route>

            <Route path="SubPlan" element={ <SubPlan/> }/>

            
          
        </Routes>


      </BrowserRouter>
    
  );
}

export default App;

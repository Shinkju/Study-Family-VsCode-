/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import LectureStuList from './pages/Lecture/LectureStuList';
import LectureProList from './pages/Lecture/LectureProuList';
import LectureStuDetail from './pages/Lecture/LectureStuDetail';
import LectureProDetail from './pages/Lecture/LectureProDetail';
import LectureResitModal from './pages/Lecture/Modal/LectureResitModal';
import Login from './pages/Member/Login';


function App() {
  

  return (
    
      <BrowserRouter>
        <Routes>
            {/* 첫 화면에서 나오는 로그인 / 회원가입 화면 */}
            <Route exact path="/" element={ <Login/> }/>

            {/* 레이아웃 픽스 + 하위 페이지 */}
            <Route path="/layout" element={ <Layout/> }>
              <Route path="lectureStuList" element={ <LectureStuList/> }/>
              <Route path="lectureStuDetail/:lectureCode" element={ <LectureStuDetail/> }/>
              <Route path="lectureProList" element={ <LectureProList/> }/>
              <Route path="lectureProDetail/:lectureCode" element={ <LectureProDetail/> }/>
              <Route path="lectureProDetail/:lectureCode" element={ <LectureResitModal/> }/>
            </Route>
        </Routes>


      </BrowserRouter>
    
  );
}

export default App;

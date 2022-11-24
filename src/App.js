/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout";
import LectureStuList from './pages/Lecture/LectureStuList';
import Login from './pages/Member/Login';


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
            {/* 첫 화면에서 나오는 로그인 / 회원가입 화면 */}
            <Route path="/" element={ <Login/> }/>

            {/* 레이아웃 픽스 + 하위 페이지 */}
            <Route path="/Layout" element={ <Layout/> }>
              <Route index element={ <LectureStuList/> }/>
            </Route>
        </Routes>


      </BrowserRouter>
    
  );
}

export default App;

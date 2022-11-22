/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutStudent from "./layouts/LayoutStudent";
import LayoutProfessor from "./layouts/LayoutProfessor";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutSubnotice from './layouts/LayoutSubnotice';
import AppClass from './pages/AppClass/AppClass';
import Subnotice from './pages/subnotice/Subnotice';
import LectureStuList from './pages/Lecture/LectureStuList';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LayoutStudent/> }>
            <Route index element={ <LectureStuList/> }/>
            <Route path="/professor" element={ <LayoutProfessor/>}/>
            <Route path="/admin" element={ <LayoutAdmin/>}/>
            <Route path="/layoutSubnotice" element={ <LayoutSubnotice/>}/>
            <Route path="/appClass" element={ <AppClass/>}/>
            <Route path="/subnotice" element={ <Subnotice/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

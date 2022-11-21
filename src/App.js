/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutStudent from "./layouts/LayoutStudent";
import LayoutProfessor from "./layouts/LayoutProfessor";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutSubnotice from './layouts/LayoutSubnotice';
import AppClass from './pages/appClass/AppClass';
import Subnotice from './pages/subnotice/Subnotice';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <LayoutStudent/> }/>
          <Route path="/professor" element={ <LayoutProfessor/>}/>
          <Route path="/admin" element={ <LayoutAdmin/>}/>
          <Route path="/layoutSubnotice" element={ <LayoutSubnotice/>}/>
          <Route path="/appClass" element={ <AppClass/>}/>
          <Route path="/subnotice" element={ <Subnotice/>}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

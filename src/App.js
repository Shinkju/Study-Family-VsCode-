/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutStudent from "./layouts/LayoutStudent";
import LayoutProfessor from "./layouts/LayoutProfessor";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AppClass from './pages/AppClass/AppClass';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <LayoutStudent/> }/>
          <Route path="/Professor" element={ <LayoutProfessor/>}/>
          <Route path="/Admin" element={ <LayoutAdmin/>}/>
          <Route path="/AppClass" element={ <AppClass/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

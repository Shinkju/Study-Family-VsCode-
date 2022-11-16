/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import Menu from './pages/Menu';
import TacMain from './pages/tac/TacMain';
import LayoutStudent from "./layouts/LayoutStudent";
import LayoutProfessor from "./layouts/LayoutProfessor";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <LayoutStudent/> }/>
          <Route path="/Professor" element={ <LayoutProfessor/>}/>
          <Route path="/Admin" element={ <LayoutAdmin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

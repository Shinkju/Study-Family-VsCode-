/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import Menu from './pages/Menu';
import TacMain from './pages/tac/TacMain';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Main/> }/>
          <Route path="/about" element={ <About/> }/>
          <Route path="/menu" element={ <Menu/> }/>
          <Route path="/tac" element={ <TacMain/> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

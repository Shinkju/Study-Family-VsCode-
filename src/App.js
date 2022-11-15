/* BrowserRouter 컴포넌트를 이용하여 라우팅 설정을 한다.  */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import Menu from './pages/Menu';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 루트 요청 시 Main으로 이동하도록 설정 */}
          {/*<Route path="/" element={ <Main/> }/>*/}
          {/* 인덱스로 설정해두면 위의 설정(루트 요청)과 동일 */}
          <Route index element={ <Main/> }/>
          <Route path="/about" element={ <About/> }/>
          <Route path="/menu" element={ <Menu/> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

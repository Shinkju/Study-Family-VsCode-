/* 다른 페이지 링크 설정
1. react-router-dom install
2. Link 컴포넌트 import
3. Link 컴포넌트의 to 속성에 연결할 url 작성하여 텍스트 노드로 보여줄 텍스트를 설정
*/

import { Link } from 'react-router-dom';

function Main() {

    return (
        <div>
            <h1>메인</h1>
            <nav>
                <Link to="/">HOME</Link>
                <Link to="/about">소개</Link>
                <Link to="/menu">메뉴목록</Link>
            </nav>
        </div>
    );
}

export default Main;

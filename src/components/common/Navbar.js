import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';

function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return (
        <div>
            <ul className={ NavbarCSS.NavlistUl }>
                {/* 학생 */}
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="LectureStuList">강의실</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/AppClass">수강신청</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">공지사항</NavLink></li> }
                {/* 관리자 */}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">강의실</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">수강신청</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">공지사항</NavLink></li> }
                {/* 교수 */}
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="LectureProList">강의실</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">수강신청</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">공지사항</NavLink></li> }
            </ul>
        </div>
    )

}

export default Navbar;
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';
import { useSelector } from 'react-redux';


function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }


    const login = useSelector((state) => state.memberReducer);
    const loginList = login.data;

   


    return (
        <>
        <div>
            <ul className={ NavbarCSS.NavlistUl }>
                <div>
                    <ul>
                        <div>
                            <div>
                                <img src="/images/admin.ico" alt=""></img>
                            </div>
                            <div>
                            <strong>{ loginList?.memberName }님</strong><br/>
                            <strong>220608</strong>
                            <p>하이미디어과</p>
                            <a href="/">마이페이지 | </a><a href="/"> 로그아웃</a>                 
                            </div>
                        </div>
                    </ul>
                </div>
                {/* 학생 */}
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/layout/lectureStuList">강의실</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/layout/AppClass">수강신청</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/">공지사항</NavLink></li> }
                {/* 관리자 */}
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">강의실</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">수강신청</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><NavLink to="/">공지사항</NavLink></li> }
                {/* 교수 */}
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/layout/lectureProList">강의실</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">수강신청</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/">학과일정</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><NavLink to="/layout/subnotice">공지사항</NavLink></li> }
            </ul>
        </div>
        </>
    )


}

export default Navbar;
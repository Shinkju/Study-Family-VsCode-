import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
import NavbarStudentCSS from './NavbarStudent.module.css';

function NavbarStudent() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return (
        <div>
                <ul className={ NavbarStudentCSS.NavlistUl }>
                <div className={NavbarStudentCSS.NavAddimg}>
                    <div className={ NavbarStudentCSS.NavInfoDiv }>
                        <img src="/images/logo2.png" alt=""></img></div>
                       <div className={NavbarStudentCSS.NavTitleDiv} >
                        <strong>홍길동님</strong><br/>
                        <strong>220608</strong>
                        <p>하이미디어과</p>
                        <a href="/">마이페이지 | </a><a href="/"> 로그아웃</a>                 
                       </div>
                </div>
                <hr/>
                <li><NavLink to="/">강의실</NavLink></li>
                <hr/>
                <li><NavLink to="/appClass">수강신청</NavLink></li>
                <hr/>
                <li><NavLink to="/">학과일정</NavLink></li>
                <hr/>
                <li><NavLink to="/">공지사항</NavLink></li>
               
            </ul>
        </div>
    )

}

export default NavbarStudent;
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
import NavbarStudentCSS from './NavbarStudent.module.css';


function NavbarAdmin() {

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
                        <img src="/images/admin.ico" alt=""></img></div>
                        <div className={NavbarStudentCSS.NavTitleDiv} >
                            <strong>관리자님</strong><br/>
                            <a href="/">로그아웃</a>                   
                         </div>
                </div>
                <hr/>
                <li><NavLink to="/">인사관리</NavLink></li>
                <hr/>
                <li><NavLink to="/">강의실</NavLink></li>
                <hr/>
                <li><NavLink to="/">과목관리</NavLink></li>
                <hr/>
                <li><NavLink to="/">학과일정</NavLink></li>
                <hr/>
                <li><NavLink to="/">공지사항</NavLink></li>
               
            </ul>
        </div>
    )

}

export default NavbarAdmin;
import { NavLink } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';
import ManagementSidebarCSS from './ManagementSidebar.module.css';


function ManagementSidebar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return(
        <>
            <div>
                <ul className={ ManagementSidebarCSS.NavlistUl }>
                    <li><NavLink to="/management/Student">학생관리</NavLink></li>
                    <li><NavLink to="/management/professor">교수관리</NavLink></li>
                </ul>
            </div>
        </>
    )
}

export default ManagementSidebar;
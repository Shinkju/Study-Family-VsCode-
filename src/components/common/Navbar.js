import { decodeJwt } from '../../utils/tokenUtils';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import NavbarCSS from './Navbar.module.css';
import { callLogoutAPI, callGetMyInfoAPI } from '../../apis/MemberApiCalls';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';


function Navbar() {

    const member = useSelector(state => state.memberReducer);
    const memberDetail = member.data;
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;


    const dispatch = useDispatch();
    const navigate = useNavigate();


    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

   
    /* 로그아웃 토큰 폐기 처리 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        window.location = "http://localhost:3000/";
    }


    /* 내 정보 불러오기 */
    useEffect(() => {
        if(isLogin){
            dispatch(callGetMyInfoAPI({
                loginId: isLogin.loginId
            }));
        }
    },[]);



    function AfterLogin() {

        return(

            <div className={ NavbarCSS.logout }
            onClick = { onClickLogoutHandler }
            >
            로그아웃

            </div>

        );

    }

    return (
        <>
        <div style={{ margin:0 }}>
            <ul className={ NavbarCSS.NavlistUl }>
                <div>
                    { memberDetail && 
                        <div>
                            <img 
                                src="/images/logo2.png" 
                                alt=""
                                className={ NavbarCSS.imgLogo }
                            ></img>
                            <div>
                                <strong  className={ NavbarCSS.myInfoNav }>{ memberDetail?.professor?.professorName || memberDetail?.student?.studentName || '관리자' }님</strong><br/>
                                <strong style={{ marginLeft:20, marginRight:18 }} >{ memberDetail?.professor?.professorCode || memberDetail?.student?.studentCode || '' }</strong>
                                <strong  >{ memberDetail?.professor?.professor?.department?.departmentName || memberDetail?.student?.department?.departmentName || '' }</strong>
                            </div>
                            
                        </div>
                    } 
                </div>
                <li>
                {/* 학생 */}
                { decoded === "ROLE_STUDENT" &&<li><NavLink to="/layout/lectureStuList">강의실</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><hr/><NavLink to="/layout/AppClass">수강신청</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><hr/><NavLink to="/layout/calendarView">학과일정</NavLink></li> }
                { decoded === "ROLE_STUDENT" &&<li><hr/><NavLink to="/board/schoolnotice">공지사항</NavLink></li> }

                 {/* 관리자 */}
                { decoded === "ROLE_ADMIN" &&<li><hr/><NavLink to="/management/student">인사관리</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><hr/><NavLink to="/layout/calendarView">학과일정</NavLink></li> }
                { decoded === "ROLE_ADMIN" &&<li><hr/><NavLink to="/board/schoolnotice">공지사항</NavLink></li> }

                {/* 교수 */}
                { decoded === "ROLE_PROFESSOR" &&<li><hr/><NavLink to="/layout/lectureProList">강의실</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><hr/><NavLink to="/layout/calendarView">학과일정</NavLink></li>}
                { decoded === "ROLE_PROFESSOR" &&<li><hr/><NavLink to="/layout/professorLectureList">학생관리</NavLink></li> }
                { decoded === "ROLE_PROFESSOR" &&<li><hr/><NavLink to="/board/schoolnotice">공지사항</NavLink></li> }

                    <div>
                        {/* { memberDetail && <> */}
                            { decoded === "ROLE_STUDENT" &&<li><NavLink to ="/layout/studentMyPage">마이페이지</NavLink></li> }
                            { decoded === "ROLE_PROFESSOR" &&<li><NavLink to ="/layout/professorMyPage">마이페이지</NavLink></li> }
                            <hr/><AfterLogin> 로그아웃</AfterLogin>
                        {/* </>} */}
                    </div>
                </li>
                
            </ul>
        </div>
        </>
    )

}

export default Navbar;
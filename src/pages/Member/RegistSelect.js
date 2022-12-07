import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callRegistAPI } from '../../apis/MemberApiCalls';
import LoginSelectCss from './RegistSelect.module.css';

function RegistSelect() {

    const navigate = useNavigate();

    /* 교수 가입 페이지로 이동 */
    const onClickProfessorRegistHandler = () => {
       navigate("/professorauth/professorRegist", { replace : true });
    }

    /* 회원 가입 API 호출 */
    const onClickStudentRegistHandler = () => {
        navigate("/studentauth/studentRegist", { replace : true });
    }

    /* 일반 가입(관리자) API 호출 */
    const onClickRegistHandler = () => {
        navigate("/auth/regist", { replace : true });
    }

    /* 이전 화면 */
    const onClickBackHandler = () => {
        navigate("/", { replace : true });
    }

    return (
        <div className={ LoginSelectCss.backgroundDiv }>
            <div className={ LoginSelectCss.select }>
                <div>
                    <h1 align="center">회원가입 선택</h1>
                    <div className={ LoginSelectCss.selectbtn }>
                    <button className={ LoginSelectCss.btn }
                        onClick = { onClickProfessorRegistHandler }
                    >   
                        교수 회원가입
                    </button>
                    <button className={ LoginSelectCss.btn }
                        onClick = { onClickStudentRegistHandler }
                    >   
                        학생 회원가입
                    </button>
                    <button className={ LoginSelectCss.btn }
                        onClick = { onClickRegistHandler }
                    >   
                        관리자 회원가입
                    </button>
                    <button className={ LoginSelectCss.btn }
                        // style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                        onClick = { onClickBackHandler }
                    >
                        돌아가기
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistSelect;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callStudentRegistAPI } from '../../apis/MemberApiCalls';
import StudentLoginCss from './StudentRegist.module.css';

function StudentRegist() {

    const student = useSelector(state => state.studentReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        loginId : '',
        loginPassword : '',
        studentRegistNum : '',
        studentCode : '',

    });

    const member = useSelector(state => state.memberReducer);

    // useEffect(() => {
    //     if(student.status === 201) {
    //         alert("학생의 회원 가입이 완료 되었습니다. 로그인 페이지로 이동합니다.");
    //         navigate("/login", { replace : true });
    //     }
    // },
    // [student]);



    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickBackHandler = () => {
        navigate("/", { replace : true });
    }

    /* 학생 가입 API 호출 */
    const onClickRegisterHandler = () => {
        dispatch(callStudentRegistAPI({
            form : form
        }));
    }

    return (
        <>
        <div className={ StudentLoginCss.backgroundDiv }>
            <div className={ StudentLoginCss.stuRegist }>
                <h1>학생 회원가입</h1>
                <input className={ StudentLoginCss.idInput }
                    type="text" 
                    name="loginId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ StudentLoginCss.pwInput }
                    type="password"
                    name="loginPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ StudentLoginCss.pwInput }
                    type="text"
                    name="studentRegistNum" 
                    placeholder="studentRegistNum" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ StudentLoginCss.pwInput }
                    type="text"
                    name="studentCode" 
                    placeholder="studentCode" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button className={ StudentLoginCss.btn }
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button className={ StudentLoginCss.btn }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
        </>
    );
}

export default StudentRegist;

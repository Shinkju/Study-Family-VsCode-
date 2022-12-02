import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callStudentRegistAPI } from '../../apis/MemberApiCalls';

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
        <div >
            <div >
                <h1>학생 회원가입</h1>
                <input 
                    type="text" 
                    name="loginId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name="loginPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                                <input 
                    type="text"
                    name="studentRegistNum" 
                    placeholder="studentRegistNum" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text"
                    name="studentCode" 
                    placeholder="studentCode" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
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

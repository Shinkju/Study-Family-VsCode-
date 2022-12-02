import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callLoginAPI } from '../../apis/MemberApiCalls';

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    // API 요청을 통해서 반환 된 로그인 결과 값
    const login = useSelector((state) => state.memberReducer);

    useEffect(() => {
        if(login.status === 200){

            alert('로그인 완료!');

            if(decoded === 'ROLE_STUDENT'){
                console.log("[Login] Login SUCCESS {}", login);
                navigate("/layout/lectureStuList", { replace: true });  //리듀서값 변경 시 동작
            } else if(decoded === 'ROLE_PROFESSOR'){
                console.log("[Login] Login SUCCESS {}", login);
                navigate("/layout/lectureProList", { replace: true });
            } else if(decoded === 'ROLE_ADMIN'){
                console.log("[Login] Login SUCCESS {}", login);
                navigate("/layout/", { replace: true });
            }
        }
    }
    ,[login]
    );


    // 폼 받은 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        loginId: '',
        loginPassword: ''
    });


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    //로그인 디스패치
    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form : form
        }))
    }


    //회원가입 선택 페이지로 이동
    const onClickRegisterHandler = () => {
        navigate("/registSelect", {replace:true});
    }

    //아이디 찾기 페이지로 이동
    const onClickFindIdHandler = () => {
        navigate("/findId", {replace:true});
    }

    //
    const onClickFindPasswordHandler = () => {
        navigate("/findPassword", {replace:true});
    }

    return (
        <div>
            <div>
                <h1>로그인</h1>
                <input
                    type="text"
                    name="loginId"
                    placeholder="아이디"
                    autoComplete='off'  //자동완성 기능 끄기
                    onChange={ onChangeHandler }
                />
                <input
                    type="password"
                    name="loginPassword"
                    placeholder="패스워드"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                 <button
                    onClick={ onClickHandler }
                >
                    로그인
                </button>       
                <button
                    onClick={ onClickRegisterHandler }
                >
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickFindIdHandler }
                >
                    아이디 찾기
                </button>   
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickFindPasswordHandler }
                >
                    비밀번호 찾기
                </button>   
            </div>
        </div>

    );


}


export default Login;
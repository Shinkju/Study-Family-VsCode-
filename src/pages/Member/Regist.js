import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callRegistAPI } from '../../apis/MemberApiCalls';
import RegistCss from './Regist.module.css';

function Regist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        loginId : '',
        loginPassword : '',
        memberRole : ''
        // professor : '',
        // student : '',
        // loginCode : ''
    });

    const member = useSelector(state => state.memberReducer);

    // useEffect(() => {
    //     if(member.status === 201) {
    //         alert("회원 가입이 완료 되었습니다. 로그인 페이지로 이동합니다.");
    //         navigate("/login", { replace : true });
    //     }
    // },
    // [member]);



    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 회원 가입 API 호출 */
    const onClickRegisterHandler = () => {
        dispatch(callRegistAPI({
            form : form
        }));
    }

    const onClickBackHandler = () => {
        navigate("/", { replace : true });
    }

    return (
        <div className={ RegistCss.backgroundDiv }>
            <div className={ RegistCss.Regist }>
                <h1>일반 회원가입</h1>
                <input className={ RegistCss.idInput }
                    type="text" 
                    name="loginId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input className={ RegistCss.pwInput }
                    type="password"
                    name="loginPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="hidden"
                    name="memberRole"
                    placeholder="관리자 회원가입"
                    memberRole="ROLE_ADMIN"
                    autoComplete='off'
                    value="ROLE_ADMIN"
                    onChange={ onChangeHandler }
                />
                <button  className={ RegistCss.btn }
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                <button  className={ RegistCss.btn }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Regist;

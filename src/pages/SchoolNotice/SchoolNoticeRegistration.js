import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callSchoolNoticeRegistAPI } from "../../apis/SchoolNoticeApiCalls";
import SchoolNoticeCSS from './SchoolNotice.module.css';

function SchoolNoticeRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        
        schoolNoticeTitle : '',
        schoolNoticeContent : '',
        // schoolNoticeRegDate : '',
        // schoolNoticeState : '',
        schoolNoticeCategory : '',
        departmentCode : ''
    });

        /* 입력 양식의 값 변경될 때 */
        const onChangeHandler = (e) => {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
        }


    const onClickSchoolNoticeRegistrationHandler = () => {

        
        dispatch(callSchoolNoticeRegistAPI({
            form : form
        }));

        console.log("form", form);
        navigate('/board/schoolnotice', { replace : true });
        window.location.reload();
    
    }

    return (
        <div>
            <div>
                <div>
                    <table className={ SchoolNoticeCSS.schoolNoticeInsertTable }>
                        <tbody>
                            <tr>
                                <td><label>제목</label></td>
                                <td><input className={ SchoolNoticeCSS.schoolNoticeTitle }
                                    name='schoolNoticeTitle'
                                    placeholder='제목'
                                    onChange={ onChangeHandler }/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>구분</label></td>
                                <td>
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="schoolNoticeCategory" onChange={ onChangeHandler } value="학교"/>학교</label> &nbsp;
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="schoolNoticeCategory" onChange={ onChangeHandler } value="학과"/>학과</label> &nbsp;
                                </td>
                            </tr>
                            <tr>
                            <td>
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="departmentCode" onChange={ onChangeHandler } value="1"/>건축학과</label>&nbsp;
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="departmentCode" onChange={ onChangeHandler } value="2"/>기계공학과</label>&nbsp;
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="departmentCode" onChange={ onChangeHandler } value="3"/>전기공학과</label>&nbsp;
                                    <label><input className={ SchoolNoticeCSS.schoolNoticeRadio } type="radio" name="departmentCode" onChange={ onChangeHandler } value="4"/>국문학과</label>&nbsp;
                                </td>
                            </tr>
                            <tr>
                            <td colSpan={2}>
                            <textarea
                            placeholder="내용" 
                            name='schoolNoticeContent'
                            autoComplete='off'
                            onChange={ onChangeHandler }
                            >
                            </textarea>
                            </td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={ SchoolNoticeCSS.noticeInsertBtn }>
                <button className={ SchoolNoticeCSS.DetailBtn } 
                    onClick={ () => navigate(-1) }
                > 돌아가기 </button>
                <button className={ SchoolNoticeCSS.DetailBtn } 
                    onClick={ onClickSchoolNoticeRegistrationHandler }
                > 공지등록 </button>
            </div>

        </div>
    );
   
}

export default SchoolNoticeRegistration;
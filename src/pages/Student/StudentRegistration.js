import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callStudentRegistAPI } from "../../apis/StudentListApiCalls";
import StudentManagementCSS from './StudentManagement.module.css';


function StudentRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        
        studentCode : '',
        studentName : '',
        admissionsDay : '',
        department : '',
        studentRegistNum : '',
        grade : '',
        gender : '',
        studentEmail : '',
        studentPhone : '',
        studentAddress : '',
        nationality : '',
        schoolStatus : ''
    });

        /* 입력 양식의 값 변경될 때 */
        const onChangeHandler = (e) => {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
        }


    const onClickStudentRegistrationHandler = () => {

        
        dispatch(callStudentRegistAPI({
            form : form
        }));

        console.log("form", form);
        navigate('/management/student', { replace : true });
        window.location.reload();
    
    }

    return (
        <div>
            <div>
                <div>
                    <table className={ StudentManagementCSS.studentInsertform }>
                        <tbody>
                            <tr>
                                <td><label>학과</label></td>
                                <td>
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value="1"/>건축학과</label> &nbsp;
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value="2"/>기계공학과</label> &nbsp;
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value="3"/>전기공학과</label> &nbsp;
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value="4"/>국문학과</label> &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td><label>입학년도</label></td>
                                <td><input name='admissionsDay' onChange={ onChangeHandler }/></td>
                            </tr>

                            <tr>
                                <td><label>학번</label></td>
                                <td>
                                    <input
                                        name='studentCode'
                                        placeholder='학번'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>
                            <tr>
                                <td><label>주민번호</label></td>
                                <td>
                                    <input
                                        name='studentRegistNum'
                                        placeholder='-는 제외하고 입력하세요.'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>

                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input
                                        name='studentName'
                                        placeholder='학생 이름'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>
                            <tr>
                                <td><label>학년</label></td>
                                <td>
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value="1"/>1학년</label> &nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value="2"/>2학년</label> &nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value="3"/>3학년</label> &nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value="4"/>4학년</label> &nbsp;
                                </td>
                            </tr>

                            <tr>
                                <td><label>국적</label></td>
                                <td>
                                    <input
                                        name='nationality'
                                        placeholder='국적'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>
                            <tr>
                                <td><label>상태</label></td>
                                <td>
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value="1"/>재학중</label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value="2"/>휴학</label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value="3"/>재적</label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value="4"/>졸업</label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value="5"/>자퇴</label> &nbsp;
                                </td>
                            </tr>

                            <tr>
                                <td><label>핸드폰</label></td>
                                <td>
                                    <input
                                        name='studentPhone'
                                        placeholder='핸드폰번호'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>
                            <tr>
                                <td><label>이메일</label></td>
                                <td>
                                    <input
                                        name='studentEmail'
                                        placeholder='이메일주소'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>

                            <tr>
                                <td><label>주소</label></td>
                                <td>
                                    <input
                                        name='studentAddress'
                                        placeholder='거주지 주소'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>
                            <tr>
                                <td><label>성별</label></td>
                                <td>
                                    <input
                                        name='gender'
                                        placeholder='성별'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className={ StudentManagementCSS.studentInsertBtn }>
                <button className={ StudentManagementCSS.DetailBtn }
                    onClick={ () => navigate(-1) }
                > 돌아가기 </button>
                <button className={ StudentManagementCSS.DetailBtn }
                    onClick={ onClickStudentRegistrationHandler }
                > 학생등록 </button>
            </div>

        </div>
    );
   
}

export default StudentRegistration;
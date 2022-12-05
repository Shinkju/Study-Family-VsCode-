import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI, callStudentUpdateAPI } from "../../apis/StudentListApiCalls";
import StudentManagementCSS from './StudentManagement.module.css';



function StudentDetail(){

    const params = useParams();
    const studentDetail = useSelector(state => state.studentListReducer);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() =>{
        dispatch(callStudentDetailForAdminAPI({
            studentNo : params.studentNo
        }));
    }, []);



    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            studentNo : studentDetail.studentNo,
            studentCode : studentDetail.studentCode,
            studentName : studentDetail.studentName,
            admissionsDay : studentDetail.admissionsDay,
            departmentCode : studentDetail.department.departmentCode,
            studentRegistNum : studentDetail.studentRegistNum,
            grade : studentDetail.grade,
            gender : studentDetail.gender,
            studentEmail : studentDetail.studentEmail,
            studentPhone : studentDetail.studentPhone,
            studentAddress : studentDetail.studentAddress,
            nationality : studentDetail.nationality,
            schoolStatusCode : studentDetail.schoolStatus.schoolStatusCode
        });
    }

    const onClickStudentUpdateHandler = () => {

        dispatch(callStudentUpdateAPI({
            form : form
        }));

        navigate(`/management/student`, { replace : true });
        window.location.reload();
 
    }

    return(
        <div> 
            <div>
                    <table className={ StudentManagementCSS.studentDetailform }>
                        <tbody>
                            <tr>
                                <td><label>학과</label></td>
                                <td>
                                    {/* Code = 1:건축학과, 2:기계공학과, 3:전기공학과, 4:국문학과 */}
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value={1}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.department?.departmentCode : form.departmentCode) == 1 ? true : false }
                                    /> 건축학과 </label> &nbsp;
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value={2}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.department?.departmentCode : form.departmentCode) == 2 ? true : false }
                                    /> 기계공학과 </label> &nbsp;
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value={3}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.department?.departmentCode : form.departmentCode) == 3 ? true : false }
                                    /> 전기공학과 </label>
                                    <label><input type="radio" name="departmentCode" onChange={ onChangeHandler } value={4}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.department?.departmentCode : form.departmentCode) == 4 ? true : false }
                                    /> 국문학과 </label>
                                </td>
                                </tr>
                                <tr>

                                <td><label>입학년도</label></td>
                                <td><input name='admissionsDay' onChange={ onChangeHandler }
                                            value={ (!modifyMode ? studentDetail.admissionsDay : form.admissionsDay ) || ''}
                                            readOnly={ modifyMode ? false : true }/></td>
                            </tr>

                            <tr>
                            <td><label>학번</label></td>
                                <td>
                                    <input
                                        name='studentCode'
                                        placeholder='학번'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentCode : form.studentCode ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>

                            <tr>
                                <td><label>이름</label></td>
                                <td>
                                    <input
                                        name='studentName'
                                        placeholder='학생 이름'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentName : form.studentName ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>
                            <tr>
                            <td><label>주민번호</label></td>
                                <td>
                                    <input
                                        name='studentRegistNum'
                                    
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentRegistNum : form.studentRegistNum ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>

                            <tr>
                                <td><label>학년</label></td>
                                <td>
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value={1}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.grade : form.grade) == 1 ? true : false }
                                    /> 1학년</label> &nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value={2}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.grade : form.grade) == 2 ? true : false }
                                    /> 2학년 </label> &nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value={3}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.grade : form.grade) == 3 ? true : false }
                                    /> 3학년</label>&nbsp;
                                    <label><input type="radio" name="grade" onChange={ onChangeHandler } value={4}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.grade : form.grade) == 4 ? true : false }
                                    /> 4학년</label>
                                </td>
                            </tr>

                            <tr>
                                <td><label>국적</label></td>
                                <td>
                                    <input
                                        name='nationality'
                                        placeholder='국적'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.nationality : form.nationality ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>

                            <tr>
                            <td><label>주소</label></td>
                                <td>
                                    <input
                                        name='studentAddress'
                                        placeholder='거주지 주소'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentAddress : form.studentAddress ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>

                            <tr>

                                <td><label>상태</label></td>
                                <td>
                                <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value={1}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.schoolStatus?.schoolStatusCode : form.schoolStatusCode) == 1 ? true : false }
                                    /> 재학중 </label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value={2}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.schoolStatus?.schoolStatusCode : form.schoolStatusCode) == 2 ? true : false }
                                    /> 휴학 </label> &nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value={3}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.schoolStatus?.schoolStatusCode : form.schoolStatusCode) == 3 ? true : false }
                                    /> 재적</label>&nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value={4}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.schoolStatus?.schoolStatusCode : form.schoolStatusCode) == 4 ? true : false }
                                    /> 졸업 </label>&nbsp;
                                    <label><input type="radio" name="schoolStatusCode" onChange={ onChangeHandler } value={5}
                                    readOnly={ modifyMode ? false : true }
                                    checked={ (!modifyMode ? studentDetail.schoolStatus?.schoolStatusCode : form.schoolStatusCode) == 5 ? true : false }
                                    /> 자퇴 </label>
                                </td>
                            </tr>

                            <tr>
                                <td><label>핸드폰</label></td>
                                <td>
                                    <input
                                        name='studentPhone'
                                        placeholder='핸드폰번호'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentPhone : form.studentPhone ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>
                            <tr>
                            <td><label>이메일</label></td>
                                <td>
                                    <input
                                        name='studentEmail'
                                        placeholder='이메일주소'
                                        onChange={ onChangeHandler } 
                                        value={ (!modifyMode ? studentDetail.studentEmail : form.studentEmail ) || ''}
                                        readOnly={ modifyMode ? false : true }/>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className={ StudentManagementCSS.studentDetailBtn }>
                <button className={ StudentManagementCSS.DetailBtn }     
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button className={ StudentManagementCSS.DetailBtn } 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button className={ StudentManagementCSS.DetailBtn } 
                    onClick={ onClickStudentUpdateHandler }
                >
                    학생정보 저장하기
                </button>
            }
            </div>        
                </div>
            
      
    )




}

export default StudentDetail;
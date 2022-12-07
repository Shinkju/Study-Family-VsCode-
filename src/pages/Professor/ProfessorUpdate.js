import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callProfessorDetailAPI, callProfessorUpdateAPI } from "../../apis/ProfessorListApiCalls";


function ProfessorUpdate() {

    const params = useParams();
    const professorDetail = useSelector(state => state.professorListReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() =>{
        dispatch(callProfessorDetailAPI({
            professorCode : params.professorCode
        }));
    },
    []);

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
            professorCode : professorDetail.professorCode,
            professorName : professorDetail.professorName,
            professorPosition : professorDetail.professorPosition,
            professorHireDate : professorDetail.professorHireDate,
            professorRegistNum : professorDetail.professorRegistNum,
            professorPhone : professorDetail.professorPhone,
            professorAddress : professorDetail.professorAddress,
            professorStatus : professorDetail.professorStatus,
            professorEmail : professorDetail.professorEmail,
            departmentCode : professorDetail.departmentCode   
        });
    }

    const onClickProfessorUpdateHandler = () => {

        dispatch(callProfessorUpdateAPI({
            form : form
        }));

        navigate('/management/professor', { replace : true });
        window.location.reload();
    }

    return(
        <div> 
        <div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>교수 ID</label></td>
                            <td><input name='professorCode' onChange={ onChangeHandler }
                                        value={ (!modifyMode ? professorDetail.professorCode : form.professorCode ) || ''}
                                        readOnly={ modifyMode ? false : true }/></td>
                            </tr>
                            <tr>

                            <td><label>교수명</label></td>
                            <td><input name='professorName' onChange={ onChangeHandler }
                                        value={ (!modifyMode ? professorDetail.professorName : form.professorName ) || ''}
                                        readOnly={ modifyMode ? false : true }/></td>
                        </tr>

                        <tr>
                            <td><label>직위</label></td>
                            <td>
                                <input
                                    name='professorPosition'
                                    placeholder='직위'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorPosition : form.professorPosition ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                            <td><label>임용일자</label></td>
                            <td>
                                <input
                                    name='professorHireDate'
                                
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorHireDate : form.professorHireDate ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>

                        </tr>

                        <tr>
                            <td><label>주민번호</label></td>
                            <td>
                                <input
                                    name='professorRegistNum'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorRegistNum : form.professorRegistNum ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                            <td><label>전화번호</label></td>
                            <td>
                                <input
                                    name='professorPhone'
                                    placeholder='핸드폰 번호'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorPhone : form.professorPhone ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                        </tr>

                        <tr>
                            <td><label>주소</label></td>
                            <td>
                                <input
                                    name='professorAddress'
                                    placeholder='주소'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorAddress : form.professorAddress ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                            <td><label>재직여부</label></td>
                            <td>
                                <input
                                    name='professorStatus'
                                    placeholder='재직상태'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorStatus : form.professorStatus ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                        </tr>

                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                    name='professorEmail'
                                    placeholder='이메일'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.professorEmail : form.professorEmail ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>
                            <td><label>학과코드</label></td>
                            <td>
                                <input
                                    name='departmentCode'
                                    placeholder='학과'
                                    onChange={ onChangeHandler } 
                                    value={ (!modifyMode ? professorDetail.Department?.departmentCode : form.departmentCode ) || ''}
                                    readOnly={ modifyMode ? false : true }/>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
            
            <div>
                <button
                    onClick={ () => navigate(-1) }
                > 목록으로 </button>
            {!modifyMode &&
                <button
                    onClick={ onClickModifyModeHandler }
                >
                    수정 하기
                </button>
            }
            {modifyMode &&
                <button
                    onClick={ onClickProfessorUpdateHandler }
                >
                    교수정보 저장하기
                </button>
            }
            </div>
            </div>

    )



}

export default ProfessorUpdate;
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callProfessorRegistAPI } from "../../apis/ProfessorListApiCalls";
import ProfessorManagementCSS from './ProfessorManagement.module.css';

function ProfessorRegistration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({

        professorName : '',
        professorPosition : '',
        professorHireDate : '',
        professorRegistNum : '',
        professorPhone : '',
        professorAddress : '',
        professorStatus : '',
        professorEmail : '',
        departmentCode : ''
        
    });

        /* 입력 양식의 값 변경될 때 */
        const onChangeHandler = (e) => {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
        }


    const onClickProfessorRegistrationHandler = () => {

        
        dispatch(callProfessorRegistAPI({
            form : form
        }));
    
        console.log("form", form)
        navigate('/management/professor', { replace : true });
        window.location.reload();
    
    }

    return (
        <div>
            <div>
                <div>
                    <table className={ ProfessorManagementCSS.professorInsertform }>
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
                                <td><label>이름</label></td>
                                <td>
                                    <input
                                        name='professorName'
                                        placeholder='이름'
                                        onChange={ onChangeHandler } />
                                </td>
                                
                            </tr>

                            <tr>
                                <td><label>주민번호</label></td>
                                <td>
                                    <input
                                        name='professorRegistNum'
                                        placeholder='-는 제외하고 입력하세요.'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>


                            <tr>
                                <td><label>직위</label></td>
                                <td>
                                    <input
                                        name='professorPosition'
                                        placeholder='직위'
                                        onChange={ onChangeHandler } />
                                </td>
                                
                            </tr>

                            <tr>
                            <td><label>임용일자</label></td>
                                <td>
                                    <input type="date" name="professorHireDate" 
                                            onChange={ onChangeHandler } 
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>핸드폰</label></td>
                                <td>
                                    <input
                                        name='professorPhone'
                                        placeholder='핸드폰번호'
                                        onChange={ onChangeHandler } />
                                </td>
                               
                            </tr>

                            <tr>
                            <td><label>이메일</label></td>
                                <td>
                                    <input
                                        name='professorEmail'
                                        placeholder='이메일주소'
                                        onChange={ onChangeHandler } />
                                </td>

                            </tr>
                            <tr>
                                <td><label>재직여부</label></td>
                                <td>
                                <label><input type="radio" name="professorStatus" onChange={ onChangeHandler } value="Y"/>Y</label> &nbsp;
                                <label><input type="radio" name="professorStatus" onChange={ onChangeHandler } value="N"/>N</label> &nbsp;
                                </td>
                                                                
                            </tr>
                            <tr>
                            <td><label>주소</label></td>
                                <td>
                                    <input
                                        name='professorAddress'
                                        placeholder='거주지 주소'
                                        onChange={ onChangeHandler } />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className={ ProfessorManagementCSS.professorInsertBtn }>
                <button className={ ProfessorManagementCSS.DetailBtn }
                    onClick={ () => navigate(-1) }
                > 돌아가기 </button>
                <button className={ ProfessorManagementCSS.DetailBtn }
                    onClick={ onClickProfessorRegistrationHandler }
                > 교수등록 </button>
            </div>

        </div>
    );
   
}

export default ProfessorRegistration;
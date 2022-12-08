import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callSchoolNoticeDetailAPI, callSchoolNoticeUpdateAPI } from "../../apis/SchoolNoticeApiCalls";
import SchoolNoticeCSS from './SchoolNotice.module.css';


function SchoolNoticeDetail(){

    const params = useParams();
    const schoolNoticeDetail = useSelector(state => state.schoolNoticeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() =>{
        dispatch(callSchoolNoticeDetailAPI({
            schoolNoticeCode : params.schoolNoticeCode
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
            schoolNoticeTitle : schoolNoticeDetail.schoolNoticeTitle,
                schoolNoticeContent : schoolNoticeDetail.schoolNoticeContent,
                schoolNoticeRegDate : schoolNoticeDetail.schoolNoticeRegDate,
                schoolNoticeState : schoolNoticeDetail.schoolNoticeState,
                schoolNoticeCategory : schoolNoticeDetail.schoolNoticeCategory,
                departmentCode : schoolNoticeDetail.department.departmentCode
        });
    }

    const onClickSchoolNoticeUpdateHandler = () => {

        dispatch(callSchoolNoticeUpdateAPI({
            form : form
        }));

        // navigate(`/board/schoolnotice`, { replace : true });
        // window.location.reload();
 
    }

    return(
        <div> 
            <div>
                    <table className={ SchoolNoticeCSS.schoolNoticeDetailTable }>
                        <tbody>
                            <tr>
                                <td className={ SchoolNoticeCSS.schoolNoticeTitle }><label>제목</label></td>
                                <td className={ SchoolNoticeCSS.schoolNoticeContent }><input
                                    name='schoolNoticeTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? schoolNoticeDetail.schoolNoticeTitle : form.schoolNoticeTitle ) || ''}/>
                                </td>
                            </tr>
                            <tr>
                            <th>작성일</th>
                            <td>
                                <input
                                    name='schoolNoticeRegDate'
                                    placeholder='작성일'
                                    readOnly={true}
                                    value={ schoolNoticeDetail && schoolNoticeDetail.schoolNoticeRegDate || ''}
                                />    
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea
                                    name='schoolNoticeContent'
                                    readOnly={modifyMode ? false : true}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? schoolNoticeDetail.schoolNoticeContent : form.schoolNoticeContent) || ''}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>



                <div> 
                <button className={ SchoolNoticeCSS.insertBtn }        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
            {/* {!modifyMode &&
                <button 
                    onClick={ onClickModifyModeHandler }
                >
                    수정 모드
                </button>
            }
            {modifyMode &&
                <button 
                    onClick={ onClickSchoolNoticeUpdateHandler }
                >
                    저장하기
                </button>
            } */}
            </div>        
                </div>
            
      
    )




}

export default SchoolNoticeDetail;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callSubnoticeDetailAPI, callSubnoticeUpdateAPI, callSubnoticeDeleteAPI }  from '../../apis/SubnoticeApiCalls';
import SubnoticeDetailCSS from './SubnoticeDetail.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import BtnCSS from './Btn.module.css';
import Swal from 'sweetalert2';

function SubnoticeDetail() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subnotice = useSelector(state => state.subnoticeReducer);
    const subnoticeDetail = subnotice.data;
    const params = useParams();
    /* 읽기모드와 수정모드를 구분 */
    const [updateMode, setUpdateMode] = useState(false);   
    const [form, setForm] = useState({}); 
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 

    /* 최초 랜더링 시 공지사항 상세 조회 */
    useEffect(
        () => {
            console.log('[SubnoticeDetail] subnoticeCode페이지쪽 : ', params.subnoticeCode);
            dispatch(callSubnoticeDetailAPI({
                subnoticeCode: params.subnoticeCode
            }));
        }
        , []
    );

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 수정 모드 변경 이벤트 */
    const onClickUpdateModeHandler = () => {
        setUpdateMode(true);
        setForm({
            subnoticeCode: subnoticeDetail.subnoticeCode,
            subnoticeTitle: subnoticeDetail.subnoticeTitle,
            content: subnoticeDetail.content,
            lectureCode : subnoticeDetail.lecture.lectureCode
        });
    }

    /* 공지사항 수정 버튼 클릭 이벤트 */
    const onClickSubnoticeUpdateHandler = () => {        

        dispatch(callSubnoticeUpdateAPI({	
            form: form
        }));         

        Swal.fire({
            title: '수정 완료',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
                navigate(`/layout/subnotice`, { replace: true});
        window.location.reload();
            }
        })
    }  
    
    /* 공지사항 삭제 버튼 클릭 이벤트 */
    const onClickSubnoticeDeleteHandler = () => {
        console.log('[SubnoticeDetail 공지사항 번호] : ', form.subnoticeCode);
        dispatch(callSubnoticeDeleteAPI({form: form}));

        Swal.fire({
            title: '삭제 완료',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
                navigate(`/layout/subnotice`, { replace: true});
        window.location.reload();
            }
        })
    }  

    /* 목록 클릭시 이동 */
    const onClickSubnoticeListHandler = () => {
        navigate(`/layout/subnotice`, { replace : true });
    }
    
    return (
        <div> 
            <div> <br/><br/><br/>
            <table className={ SubnoticeDetailCSS.subNoticeInsertTable }>
                <tbody>
                    <tr>
                    <td>
                    <input     
                    className={ SubnoticeDetailCSS.code }
                    name='lectureName'
                    readOnly={updateMode ? false : true}
                    onChange={ onChangeHandler }
                    value={ subnoticeDetail && subnoticeDetail.lecture?.lectureName || ''}/>
                    </td>
                </tr>

                <tr>
                <td>
                <input     
                    className={ SubnoticeDetailCSS.subNoticeTitle } 
                    name='subnoticeTitle'
                    readOnly={updateMode ? false : true}
                    onChange={ onChangeHandler }
                    value={ (!updateMode ? subnoticeDetail.subnoticeTitle : form.subnoticeTitle) || ''}
                />
                </td>
                </tr>

                <tr>
                <td colSpan={2}>
                <textarea   
                    name='content'
                    readOnly={updateMode ? false : true}
                    onChange={ onChangeHandler }
                    value={ (!updateMode ? subnoticeDetail.content : form.content) || ''}
                />
                 </td>
                 </tr>
                 </tbody>
            </table>
            </div>
          <br/>

            
           
                <div className= { BtnCSS.sinBtn } >
                       
                    <button className= { BtnCSS.sinBtn2 } 
                    onClick= {onClickSubnoticeListHandler}
                    > 
                    목록 
                    </button>
                    
 
                        <div>{!updateMode &&
                            <button       
                            className= { BtnCSS.sinBtn2 } 
                                onClick={ onClickUpdateModeHandler }  
                            >
                                수정
                            </button>
                        }           
                         {updateMode &&  
                                <button       
                                className= { BtnCSS.sinBtn2 } 
                                    onClick={ onClickSubnoticeUpdateHandler }             
                                >
                                    수정
                                </button>
                             }
                       {updateMode &&  
                          <button       
                          className= { BtnCSS.sinBtn2 } 
                            onClick={ onClickSubnoticeDeleteHandler }    
                            >                                         
                                    삭제
                                </button>
                             }
                          
                            </div>
                        </div>
          </div>
    );
}

export default SubnoticeDetail;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProfessorLectureCSS from '../Student/MyPage.module.css';
import { insertLectureEvalAPI, callStudentListAPI } from '../../apis/ProfessorApiCalls';
function ProfessorEval() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const lectureDetail = useSelector((state) => state.professorReducer);
    const [form, setForm] = useState({});
    useEffect(() => {
        dispatch(callStudentListAPI({
            lectureCode : params.lectureCode
        }));
    },
    []);
    /* 기존 값 불러오기 */
    useEffect(() => {
        setForm({
             evalCode : lectureDetail.eval.evalCode,
             evalMiddle : lectureDetail.eval.evalMiddle,
             evalFinal : lectureDetail.eval.evalFinal,
             evalTask : lectureDetail.eval.evalTask,
             evalAttend : lectureDetail.eval.evalAttend
        })
    })
    /* 입력 양식 값 변경 핸들러 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    /* 수정 모드 변경 이벤트 */
    // const onClickModifyModeHandler = () => {
    //     setModifyMode(true);
    //     setForm({   //수정 모드로 변경 시 기존 값을 그대로 불러오기 위한 값 설정
    //         evalCode : evalList.evalCode,
    //         evalMiddle : evalList.evalMiddle,
    //         evalFinal : evalList.evalFinal,
    //         evalTask : evalList.evalTask,
    //         evalAttend : evalList.evalAttend
    //     });
    // }
    /* 평가 완료 클릭 이벤트 */
    const onClickEvalRegistrationHandler = () => {
        const formData = new FormData();
        formData.append("eval.evalCode", form.evalCode);
        formData.append("eval.evalMiddle", form.evalMiddle);
        formData.append("eval.evalFinal", form.evalFinal);
        formData.append("eval.evalTask", form.evalTask);
        formData.append("eval.evalAttend", form.evalAttend);
    /* 평가가 하나라도 누락되었을 시 alert창 뜨면서 리턴 */
    if(form.evalMiddle === '' || form.evalFinal === ''
     || form.evalTask === '' || form.evalAttend === '') {
        alert("모든 평가를 매겨주세요");
        return;
    }
    dispatch(insertLectureEvalAPI({
        form : formData
    }));
    /* 평가 완료가 되는 즉시 이전 페이지로 돌아감 */
    alert("평가가 완료되었습니다.");
    // navigate('/layout/professorStudentList', { replace : true });
    // window.location.reload();
      console.log('[평가 완료]');
    }
    return (
    <>
        <div className={ProfessorLectureCSS.notice}>
            <table className={ProfessorLectureCSS.noticeTable}>
                <thead>
                    <tr>
                        <th className={ProfessorLectureCSS.notice}>중간고사</th>
                        <th className={ProfessorLectureCSS.notice}>기말고사</th>
                        <th className={ProfessorLectureCSS.notice}>과제</th>
                        <th className={ProfessorLectureCSS.notice}>출석</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" name = "evalMiddle"
                                   onChange = { onChangeHandler }
                                //    value = {( !modifyMode ? evalList.evalMiddle : form.evalMiddle ) || '' }
                                //    readOnly = { modifyMode ? false : true }
                                   /></td>
                        <td><input type = "text" name = "evalFinal"
                                   onChange = { onChangeHandler }
                                //    value = {( !modifyMode ? evalList.evalFinal : form.evalFinal ) || '' }
                                //    readOnly = { modifyMode ? false : true }
                                   /></td>
                        <td><input type = "text" name = "evalTask"
                                   onChange = { onChangeHandler }
                                //    value = {( !modifyMode ? evalList.evalTask : form.evalTask ) || '' }
                                //    readOnly = { modifyMode ? false : true }
                                   /></td>
                        <td><input type = "text" name = "evalAttend"
                                   onChange = { onChangeHandler }
                                //    value = {( !modifyMode ? evalList.evalAttend : form.evalAttend ) || '' }
                                //    readOnly = { modifyMode ? false : true }
                                   /></td>
                    </tr>
                    {/* { !modifyMode &&  */}
                        {/* <button onClick = { onClickModifyModeHandler }>평가</button>  */}
                        {/* } */}
                    {/* { modifyMode &&  */}
                        <button onClick = { onClickEvalRegistrationHandler }>평가완료</button>
                        {/* } */}
                </tbody>
            </table>
        </div>
    </>
    );
}
export default ProfessorEval;
import ProfessorStudentListCSS from '../Student/MyPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callStudentListAPI, insertLectureEvalAPI } from '../../apis/ProfessorApiCalls';
import { useNavigate, useParams } from 'react-router-dom';

function ProfessorStudentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const evals = useSelector((state) => state.professorReducer);
  const lectures = useSelector((state) => state.professorReducer);
  const evalsList = evals.data;
  const evalCode = params.evalCode;
  const lectureCode = params.lectureCode;
  // const token = decodeJwt(window.localStorage.getItem('accessToken'));

  const [modifyMode, setModifyMode] = useState(false);

  const [form, setForm] = useState({});

  useEffect(() => {
    // if (token) {
      dispatch(
        callStudentListAPI({
          lectureCode : lectureCode
        })
      );
    // }
  }, []);

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }

  const onClickModifyHandler = () => {

    setModifyMode(true);
    setForm({
      evalCode : lectures.evalCode,
      evalMiddle : lectures.evalMiddle,
      evalFinal : lectures.evalFinal,
      evalTask : lectures.evalTask,
      evalAttend : lectures.evalAttend,
    });
  }

  console.log('[evalCode] : ', evalCode)
  console.log('[evals] : ', evals)
  console.log('[evalsList] : ', evalsList)

  /* 개인 정보 저장 버튼 클릭 이벤트 */
  const onClickUpdateHandler = () => {

    const formData = new FormData();

    formData.append("evalCode", form.evalCode);
    formData.append("evalMiddle", form.evalMiddle);
    formData.append("evalFinal", form.evalFinal);
    formData.append("evalTask" , form.evalTask);
    formData.append("evalAttend" , form.evalAttend);

    dispatch(insertLectureEvalAPI({
      form : formData
    }));

    // alert("강좌 평가 성공")
    // navigate('/layout/studentMyPage', { replace : true });
    // window.location.reload();
  }

  return (
    <>
      <div className={ProfessorStudentListCSS.notice}>
        <table className={ProfessorStudentListCSS.noticeTable}>
          <thead>
            <tr>
              <th>NO</th>
              <th>이름</th>
              <th>학과</th>
              <th>강좌</th>
              <th>중간</th>
              <th>기말</th>
              <th>과제</th>
              <th>출석</th>
              <th>학점</th>
              <th></th>
            </tr>
              {/* <th className={ProfessorStudentListCSS.notice}>중간고사</th>
              <th className={ProfessorStudentListCSS.notice}>기말고사</th>
              <th className={ProfessorStudentListCSS.notice}>과제</th>
              <th className={ProfessorStudentListCSS.notice}>출석</th> */}
          </thead>
          <tbody>
            
                {Array.isArray(lectures) && lectures.map((lectures) => ([<>
                <tr>
                  <td>{lectures.student.studentNo || ''}</td>
                  <td>{lectures.student.studentName || ''}</td>
                  <td>{lectures.student.department.departmentName || ''}</td>
                  <td>{lectures.lecture.lectureName || ''}</td>

                  <td><input name = "evalMiddle" size = "4" maxlength = "3"
                             onChange = { onChangeHandler }
                             value = {( !modifyMode ? lectures.eval[0]?.evalMiddle : form.evalMiddle) || ''}
                             readOnly = { modifyMode ? false : true }/></td>

                  <td><input name = "evalFinal" size = "4" maxlength = "3"
                             onChange = { onChangeHandler }
                             value = {( !modifyMode ? lectures.eval[0]?.evalFinal : form.evalFinal) || ''}
                             readOnly = { modifyMode ? false : true }/></td>

                  <td><input name = "evalTask" size = "4" maxlength = "3"
                             onChange = { onChangeHandler }
                             value = {( !modifyMode ? lectures.eval[0]?.evalTask : form.evalTask) || ''}
                             readOnly = { modifyMode ? false : true }/></td>

                  <td><input name = "evalAttend" size = "4" maxlength = "3"
                             onChange = { onChangeHandler }
                             value = {( !modifyMode ? lectures.eval[0]?.evalAttend : form.evalAttend) || ''}
                             readOnly = { modifyMode ? false : true }/></td>
                  <td>{lectures.eval[0]?.evalGrade || ''}</td>
                  {/* <td> */}
                    {/* <button onClick={ () => onClickTableTr()}>평가하기</button> */}
                {/* </td> */}
                
                </tr>
                </>]))}
                  {/* <td><input type = "text" size = "4" maxlength = "3" name = "evalMiddle"
                            //  value = {( form.evalMiddle || '')}
                             onChange = { onChangeHandler } /></td>

                  <td><input type = "text" size = "4" maxlength = "3" name = "evalFinal"
                            //  value = {( form.evalFinal || '')}
                             onChange = { onChangeHandler } /></td>

                  <td><input type = "text" size = "4" maxlength = "3" name = "evalTask"
                            //  value = {( form.evalTask || '')}
                             onChange = { onChangeHandler } /></td>

                  <td><input type = "text" size = "4" maxlength = "3" name = "evalAttend"
                            //  value = {( form.evalAttend || '')}
                             onChange = { onChangeHandler } /></td> */}
              
          </tbody>
        </table>
        { !modifyMode && 
        <button onClick={onClickModifyHandler}>평가</button> }
        { modifyMode &&
        <button onClick={onClickUpdateHandler}>평가완료</button> }
      </div>
    </>
  );
}

export default ProfessorStudentList;
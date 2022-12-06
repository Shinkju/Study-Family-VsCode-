import ProfessorStudentListCSS from '../Student/MyPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callStudentListAPI } from '../../apis/ProfessorApiCalls';
import { useNavigate, useParams } from 'react-router-dom';

function ProfessorStudentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const evals = useSelector((state) => state.professorReducer);
  const lectures = useSelector((state) => state.professorReducer);
  const evalsList = evals.data;
  const lectureList = lectures.data;
  const evalCode = params.evalCode;
  const lectureCode = params.lectureCode;
  // const token = decodeJwt(window.localStorage.getItem('accessToken'));
  const [form, setForm] = useState({
    // evalCode : evalCode,
    evalMiddle : 0,
    evalFinal: 0,
    evalTask : 0,
    evalAttend : 0,
    lecture : {
      lectureCode : lectureCode
    }
  })

  useEffect(() => {
    // if (token) {
      dispatch(
        callStudentListAPI({
          lectureCode : lectureCode
        })
      );
    // }
  }, []);

  console.log('[evalCode] : ', evalCode)
  console.log('[evals] : ', evals)
  console.log('[evalsList] : ', evalsList)

  // 평가 페이지
  const onClickTableTr = (evalCode) => {

    navigate(`/layout/professorEval/${evalCode}`, { replace : false });
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
              <th>종합</th>
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
                  <td>{lectures.eval[0]?.evalMiddle || ''}</td>
                  <td>{lectures.eval[0]?.evalFinal || ''}</td>
                  <td>{lectures.eval[0]?.evalTask || ''}</td>
                  <td>{lectures.eval[0]?.evalAttend || ''}</td>
                  <td>{lectures.eval[0]?.evalResult || ''}</td>
                  <td>{lectures.eval[0]?.evalGrade || ''}</td>
                  <td><button onClick={ () => onClickTableTr(evalCode)}
                >평가하기</button></td>
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
      </div>
    </>
  );
}

export default ProfessorStudentList;
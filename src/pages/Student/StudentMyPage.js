import StudentMyPageCSS from './MyPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetStudentAPI, callStudentUpdateAPI } from '../../apis/MemberApiCalls';

function StudentMyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.memberReducer);
  const studentList = students.data;
  const token = decodeJwt(window.localStorage.getItem('accessToken'));
  const [form, setForm] = useState({});

  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  // 학생 마이페이지 - studentNo로 뽑아오기
  useEffect(() => {
    if (token) {
      dispatch(
        callGetStudentAPI({
          studentNo: token.studentNo,
        })
      );
    }
  }, []);

  /* 입력 양식의 값 변경될 때 */
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  }

  /* 개인 정보 변경 버튼 클릭 이벤트 */
  const onClickModifyHandler = () => {

    setModifyMode(true);
    setForm({
      studentNo : studentList.studentNo,
      studentPhone : studentList.studentPhone,
      studentAddress : studentList.studentAddress,
      studentEmail : studentList.studentEmail
    });
  }

  /* 개인 정보 저장 버튼 클릭 이벤트 */
  const onClickUpdateHandler = () => {

    const formData = new FormData();

    formData.append("studentNo", form.studentNo);
    formData.append("studentPhone", form.studentPhone);
    formData.append("studentAddress", form.studentAddress);
    formData.append("studentEmail" , form.studentEmail);

    dispatch(callStudentUpdateAPI({
      form : formData
    }));

    alert("개인 정보 수정이 완료되었습니다.")
    navigate('/layout/studentMyPage', { replace : true });
    window.location.reload();
  }

  console.log("studentNo", token.studentNo)
  console.log("studentList", studentList)

  return (
    <div className={StudentMyPageCSS.notice}>
      {studentList && (
        <div className={StudentMyPageCSS.StudentMyPageDiv}>
          <table className={StudentMyPageCSS.noticeTable}>
            <thead>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>이름</td>
                <td>{studentList.studentName || ''}</td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>소속</td>
                <td>{studentList.department.departmentName || ''}</td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>학번</td>
                <td>{studentList.studentCode || ''}</td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>학년</td>
                <td>{studentList.grade || ''}학년</td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>전화번호</td>
                <td>
                  <input name='studentPhone'
                         placeholder = '전화번호'
                         onChange = { onChangeHandler }
                         value = {( !modifyMode ? studentList.studentPhone : form.studentPhone ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>주소</td>
                <td>
                  <input name='studentAddress'
                         placeholder = '주소'
                         onChange = { onChangeHandler }
                         value = {(!
                         modifyMode ? studentList.studentAddress : form.studentAddress ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
              <tr className={StudentMyPageCSS.StudentMyPageUl}>
                <td>이메일</td>
                <td>
                  <input name='studentEmail'
                         placeholder = '이메일'
                         onChange = { onChangeHandler }
                         value = {( !modifyMode ? studentList.studentEmail : form.studentEmail ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      )}
      <div className={StudentMyPageCSS.notice}>
        <table className={StudentMyPageCSS.noticeTable}>
        <thead>
            <tr className={StudentMyPageCSS.noticeBar}>
            <th className={StudentMyPageCSS.notice}>NO</th>
              <th className={StudentMyPageCSS.notice}>과목명</th>
              <th className={StudentMyPageCSS.notice}>전공여부</th>
              <th className = {StudentMyPageCSS.notice}>중간고사</th>
              <th className = {StudentMyPageCSS.notice}>기말고사</th>
              <th className = {StudentMyPageCSS.notice}>과제점수</th>
              <th className = {StudentMyPageCSS.notice}>출석점수</th>
            </tr>
        </thead>
        <tbody>
                  {/* 중첩배열은 '[인덱스 값]?' 쓰면 된다. */}
                  {Array.isArray(studentList?.appClasses) && studentList.appClasses.map((student) => ([<>
                    <tr className={StudentMyPageCSS.noticeTr}>
                      <td>{student.lecture.lectureCode || ''}</td>
                      <td>{student.lecture.lectureName || ''}</td>
                      <td>{student.lecture.subject.majorType || ''}</td>
                      <td>{student.eval[0]?.evalMiddle || ''}점</td> 
                      <td>{student.eval[0]?.evalFinal || ''}점</td>
                      <td>{student.eval[0]?.evalTask || ''}점</td>
                      <td>{student.eval[0]?.evalAttend || ''}점</td>
                    </tr>
                  </>]))}
        </tbody>
        </table>
        { !modifyMode && 
        <button className={StudentMyPageCSS.memberBtn}
                onClick={onClickModifyHandler}>개인 정보 수정</button> }
        { modifyMode &&
        <button className={StudentMyPageCSS.memberBtn}
                onClick={onClickUpdateHandler}>수정 완료</button> }
      </div>
    </div>
  );
}
export default StudentMyPage;
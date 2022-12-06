import ProfessorMyPageCSS from '../Student/MyPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetProfessorAPI, callProfessorUpdateAPI } from '../../apis/MemberApiCalls';
import { useNavigate } from 'react-router-dom';

function ProfessorMyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const professors = useSelector((state) => state.memberReducer);
  const professorList = professors.data;
  const token = decodeJwt(window.localStorage.getItem('accessToken'));
  const [form, setForm] = useState({});

  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 교수 마이페이지 - professorCode로 뽑아오기 */
  useEffect(() => {
    if (token) {
      dispatch(
        callGetProfessorAPI({
          professorCode: token.professorCode,
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
      professorCode : professorList.professorCode,
      professorPhone : professorList.professorPhone,
      professorAddress : professorList.professorAddress,
      professorEmail : professorList.professorEmail
    });
  }

  /* 개인 정보 저장 버튼 클릭 이벤트 */
  const onClickUpdateHandler = () => {

    const formData = new FormData();

    formData.append("professorCode", form.professorCode);
    formData.append("professorPhone", form.professorPhone);
    formData.append("professorAddress", form.professorAddress);
    formData.append("professorEmail" , form.professorEmail);

    dispatch(callProfessorUpdateAPI({
      form : formData
    }));

    alert("개인 정보 수정이 완료되었습니다.")
    navigate('/layout/professorMyPage', { replace : true });
    window.location.reload();
  }

  console.log("professorCode", token.professorCode)
  console.log("professorList", professorList)

  return (
    <div className={ProfessorMyPageCSS.notice}>
      {professorList && (
        <div className={ProfessorMyPageCSS.StudentMyPageDiv}>
          <table className={ProfessorMyPageCSS.noticeTable}>
            <thead>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>이름</td>
                <td>{professorList.professorName || ''}</td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>소속</td>
                <td>{professorList.department.departmentName || ''}</td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>직위</td>
                <td>{professorList.professorPosition || ''}</td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>생년월일</td>
                <td>{professorList.professorRegistNum || ''}</td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>전화번호</td>
                <td>
                  <input name='professorPhone'
                         placeholder = '전화번호'
                         onChange = { onChangeHandler }
                         value = {( !modifyMode ? professorList.professorPhone : form.professorPhone ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>주소</td>
                <td>
                  <input name='professorAddress'
                         placeholder = '주소'
                         onChange = { onChangeHandler }
                         value = {(!
                         modifyMode ? professorList.professorAddress : form.professorAddress ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
              <tr className={ProfessorMyPageCSS.StudentMyPageUl}>
                <td>이메일</td>
                <td>
                  <input name='professorEmail'
                         placeholder = '이메일'
                         onChange = { onChangeHandler }
                         value = {( !modifyMode ? professorList.professorEmail : form.professorEmail ) || ''}
                         readOnly = { modifyMode ? false : true }/>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      )}
      <div className={ProfessorMyPageCSS.notice}>
        <table className={ProfessorMyPageCSS.noticeTable}>
          <thead>
          <tr className={ProfessorMyPageCSS.noticeBar}>
            <th className={ProfessorMyPageCSS.notice}>강좌코드</th>
            <th className={ProfessorMyPageCSS.notice}>개설일자</th>
            <th className={ProfessorMyPageCSS.notice}>강의명</th>
            <th className={ProfessorMyPageCSS.notice}>수강인원</th>
          </tr>
          </thead>

          <tbody>
            {Array.isArray(professorList?.lecture) && professorList.lecture.map((professor) => ([<>
              <tr className={ProfessorMyPageCSS.noticeTr}>
                <td>{professor.lectureCode || ''}</td>
                <td>{professor.openingDate || ''}</td>
                <td>{professor.lectureName || ''}</td>
                <td>{professor.lecturePersonnel || ''}/{professor.capacity}</td>
              </tr>
            </>]))}
          </tbody>
        </table>
      </div>
      <div className={ProfessorMyPageCSS.notice}>
        <table className={ProfessorMyPageCSS.noticeTable}>
          <thead>
          <tr className={ProfessorMyPageCSS.noticeBar}>
            <th className={ProfessorMyPageCSS.notice}>상태</th>
            <th className={ProfessorMyPageCSS.notice}>일자</th>
          </tr>
          </thead>
          <tbody>
            {Array.isArray(professorList?.professorHistory) && professorList.professorHistory.map((professor) => ([<>
              <tr className={ProfessorMyPageCSS.noticeTr}>
              <td>{professor.professorPosition.professorPositionName || ''}</td>
              <td>{professor.professorModifyDate || ''}</td>
            </tr>
              </>]))}
          </tbody>
        </table>
        { !modifyMode && 
        <button className={ProfessorMyPageCSS.memberBtn}
                onClick={onClickModifyHandler}>개인 정보 수정</button> }
        { modifyMode &&
        <button className={ProfessorMyPageCSS.memberBtn}
                onClick={onClickUpdateHandler}>수정 완료</button> }
      </div>
    </div>
  );
}

export default ProfessorMyPage;
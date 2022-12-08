import ProfessorStudentListCSS from '../Student/MyPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callStudentListAPI, insertLectureEvalAPI } from '../../apis/ProfessorApiCalls';
import { useNavigate, useParams } from 'react-router-dom';

function ProfessorStudentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const lectures = useSelector((state) => state.professorReducer);
  const lectureCode = params.lectureCode;

  useEffect(() => {
    // if (token) {
      dispatch(
        callStudentListAPI({
          lectureCode : lectureCode
        })
      );
    // }
  }, []);

     // 강좌 리스트로 페이지 넘기기
     const onClickPage = (lectureCode) => {

      navigate(`/layout/professorLectureList`, { replace : false })
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
          </thead>
          <tbody>
            
                {Array.isArray(lectures) && lectures.map((lectures) => ([<>
                <tr>
                  <td>{lectures.student.studentNo || ''}</td>
                  <td>{lectures.student.studentName || ''}</td>
                  <td>{lectures.student.department.departmentName || ''}</td>
                  <td>{lectures.lecture.lectureName || ''}</td>

                  <td>{lectures.eval[0]?.evalFinal || ''}점</td>

                  <td>{lectures.eval[0]?.evalFinal || ''}점</td>

                  <td>{lectures.eval[0]?.evalTask || ''}점</td>

                  <td>{lectures.eval[0]?.evalAttend || ''}점</td>

                  <td>{lectures.eval[0]?.evalGrade || ''}</td>
                
                </tr>
                </>]))}
          </tbody>
        </table>
        <button onClick = { () => onClickPage(lectures.lectureCode)}>돌아가기</button>
      </div>
    </>
  );
}

export default ProfessorStudentList;
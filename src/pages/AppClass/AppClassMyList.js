import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callLectureStuListAPI } from '../../apis/LectureAPICalls';
import { callAppClassDeleteAPI, callAppClassMyListAPI  } from '../../apis/AppClassAPICalls';
import AppClassCSS from './AppClass.module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function AppClassMyList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appClass = useSelector(state => state.appClassReducer);
    const appClassList = appClass.data;     
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    
    /* 수강신청한 목록 */
    useEffect(() => {
        if(token){
            dispatch(callLectureStuListAPI({
                studentNo: token.studentNo
            }));
        }
    },[]);


    /* 수강취소 버튼 이벤트 */
        const onClickAppClassHandler = (appClass) => {

            dispatch(callAppClassDeleteAPI(appClass));

            alert("수강 취소 되었습니다.");

    }




    return (
        <>

        신청한 과목
                <div>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                        <th>구분</th>
                         <th>강좌번호</th>
                         <th>학과명</th>
                          <th>강좌명</th>
                          <th>교수명</th>
                          <th>수강신청</th>
                          <th>수강인원</th>
                          <th>강의계획서</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Array.isArray(appClassList) && appClassList.map(
                                (appClass) => (
                                    <tr
                                        key={ appClass.lectureCode }
                                    >
                                        <td>{ appClass.lecture.subject.majorType }</td>
                                        <td>{ appClass.lecture.lectureCode }</td>
                                        <td>{ appClass.lecture.subject.department.departmentName }</td>
                                        <td>{ appClass.lecture.lectureName }</td>
                                        <td>{ appClass.lecture.professor.professorName }</td>
                                        <td><button onClick={ () => onClickAppClassHandler(appClass) }>
                                                취소
                                        </button></td>
                                        <td>{ appClass.lecture.lecturePersonnel } / { appClass.lecture.capacity }</td>
                                        <td><button>
                                                조회
                                        </button></td>
                                    </tr>
                                )
                            )
                          
                        }

                    </tbody>    
                    </table>
                    <div className= { AppClassCSS.sinBtn } >
                    <button className= { AppClassCSS.sinBtn2 }> 수강취소 </button></div>
                    
                    </div>
            </>
    );
}

export default AppClassMyList;
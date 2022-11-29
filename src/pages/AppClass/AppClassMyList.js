import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLectureStuListAPI } from '../../apis/LectureApiCalls';
import { callAppClassDeleteAPI, callAppClassMyListAPI  } from '../../apis/AppClassApiCalls';
import AppClassCSS from './AppClass.module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function AppClassMyList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lectures = useSelector(state => state.appClassReducer);
    const lectureList = lectures.data;  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const params = useParams();

    /* 수강신청한 목록 */
    useEffect(() => {
            dispatch(callAppClassMyListAPI({
               appClassCode : params.AppClassCode
            }));
        
    },[]);


    /* 수강취소 버튼 이벤트 */
        const onClickAppClassHandler = (appClassCode) => {
            console.log('[AppClassMyList 수강취소 번호 : ', appClassCode);
            dispatch(callAppClassDeleteAPI(appClassCode));

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
                            Array.isArray(lectureList) && lectureList.map(
                                (lecture) => (
                                    <tr
                                        key={ lecture.lectureCode }
                                    >
                                        <td>{ lecture.subject.majorType }</td>
                                        <td>{ lecture.lectureCode }</td>
                                        <td>{ lecture.subject.department.departmentName }</td>
                                        <td>{ lecture.lectureName }</td>
                                        <td>{ lecture.professor.professorName }</td>
                                        <td><button onClick={ (e) => onClickAppClassHandler(e.lecture) }>
                                                취소
                                        </button></td>
                                        <td>{ lecture.lecturePersonnel } / { lecture.capacity }</td>
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
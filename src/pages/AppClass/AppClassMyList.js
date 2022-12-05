import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLectureStuListAPI } from '../../apis/LectureApiCalls';
import { callAppClassDeleteAPI, callAppClassMyListAPI  } from '../../apis/AppClassApiCalls';
import AppClassCSS from './AppClass.module.css';
import SubPlan from '../SubPlan/SubPlan';

function AppClassMyList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.appClassReducer);
    const lectureList = lecture.data;  
    const params = useParams();

     // 모달창 노출 여부 state
     const [modalOpen, setModalOpen] = useState(false);
     const [lectureCode, setLectureCode] = useState(0);
 
     // 모달창 노출
     const showModal = (lectureCode) => {
         setLectureCode(lectureCode);
         setModalOpen(true);
     };

    /* 수강신청한 목록 */
    useEffect(() => {
            dispatch(callLectureStuListAPI({
               appClassCode : params.AppClassCode
            }));
    },[]);

    /* 목록 클릭시 이동 */
    const onClickAppListHandler = () => {
     navigate("/layout/AppClass", { replace : false });   
    }

    /* 수강취소 버튼 이벤트 */
        const onClickAppClassDeleteHandler = (lectureCode) => {
            console.log('[AppClassMyList 수강취소 번호] : ', lectureCode);
            dispatch(callAppClassDeleteAPI(lectureCode));
            alert("수강 취소 되었습니다.");
            window.location.reload();
    }



    return (
        <>

        신청한 과목
                <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
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
                                        <td><button className= { AppClassCSS.sinBtn3 } 
                                        onClick={ (e) => {onClickAppClassDeleteHandler(lecture);
                                        }}>
                                                취소
                                        </button></td>
                                        <td>{ lecture.lecturePersonnel } / { lecture.capacity }</td>
                                       <td><button className= { AppClassCSS.sinBtn3 } 
                                       onClick={ () => showModal(lecture.lectureCode) }
                                        > 
                                                조회
                                        </button></td>
                                    </tr>
                                )
                            )
                          
                        }

                    </tbody>   
                    </table>
                    {modalOpen && <SubPlan setModalOpen={setModalOpen} lectureCode = {lectureCode} />}
                    <div className= { AppClassCSS.sinBtn } >
                    <button onClick={ onClickAppListHandler }
                    className= { AppClassCSS.sinBtn2 }> 목록 </button></div>
                    
                    </div>
            </>
    );
}

export default AppClassMyList;
import { callLectureStuDetailAPI } from '../../apis/LectureApiCalls';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import lectureListStuCSS from './LecModal.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import LecModal from './Modal/LecModal';



function LectureStuDetail(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureDetail = lecture.data;
    const params = useParams();
    const lectureCode = params.lectureCode;
    const [lecModal, setLecModal] = useState(false);    //모달 띄우기 true/false
    const [savedRoute, setSavedRoute] = useState("");




    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    console.log(lectureDetail)


    useEffect(
        () => {
            console.log('[LectureStuDetail 해당 강의실 번호 : ', lectureCode);
            
            dispatch(callLectureStuDetailAPI({
               lectureCode: lectureCode
            }));
            
        },
        []
    );

    console.log("lectureCode = ",lectureCode)




    //모달창 띄우기
    const videoOpenFunction = (lectureWeek) => {

        setSavedRoute(lectureWeek?.savedRoute);
        setLecModal(true);
        console.log("videoOpenFunction", setSavedRoute);
    }


    //과제 등록 화면 넘기기
    const onClickLectureRegistHandler = () => {
        navigate("/layout/taskRegistStu", { replace : false });
    }



    return (
        <>


            <div>
            <div>
                <div>
                <h2>{ lectureDetail?.lectureName }  /  { lectureDetail?.professor?.professorName } 교수</h2>
                </div>
            </div><br/>
            <div>
                <table>
                    <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>회차</th>
                            <th>기간</th>
                            <th>강의 영상</th>
                            <th>출석</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(lectureDetail?.lectureWeeks) && lectureDetail?.lectureWeeks.map(
                                (lectureWeek) => ([<>
                                    <tr
                                        key={ lectureWeek.lectureWeekCode }
                                    >
                                        <td>{ lectureWeek.week || '' }</td>
                                        <td>{ lectureWeek.startDate || '' } ~ { lectureWeek.endDate || '' }</td>
                                        <td>

                                            <button 
                                                onClick={ () => videoOpenFunction(lectureWeek) }

                                            >
                                                영상 보기
                                            </button>

                                        </td>
                                        <td></td>
                                    </tr>

                                </>])
                            )
                        }
                    </tbody>        
                </table>    
            </div>

            <div>
            { 
                lecModal ? 
                <LecModal 
                    savedRoute={savedRoute}
                    setLecModal={setLecModal}
                /> 
                : null
            }       
            </div>

            <div>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickLectureRegistHandler }
                >
                    과제 제출
                </button>
                </div>
            </div>
        </>
           
    );
}


export default LectureStuDetail;
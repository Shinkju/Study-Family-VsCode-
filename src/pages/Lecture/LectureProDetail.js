import { callLectureProDetailAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import lectureListStuCSS from './LecModal.module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function LectureProDetail(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureDetail = lecture.data;
    const params = useParams();
    const lectureCode = params.lectureCode;
 
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    console.log(lectureDetail)


    useEffect(
        () => {
            console.log('[LectureProDetail 해당 강의실 번호 : ', lectureCode);
            
             dispatch(callLectureProDetailAPI({
               lectureCode: lectureCode
            }));
            
        },
        []
    );




    return(
        <>
           
            <div>
                <div>
                <h2>{ lectureDetail?.lectureName }  /  { lectureDetail?.professor?.professorName }</h2>
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
                            Array.isArray(lectureDetail?.lectureWeeks) && lectureDetail.lectureWeeks.map(
                                (lectureWeek) => ([
                                    <tr
                                        key={ lectureWeek.lectureWeekCode }
                                    >
                                        <td>{ lectureWeek.week || '' }</td>
                                        <td>{ lectureWeek.startDate } ~ { lectureWeek.endDate }</td>
                                        <td>
                                           
                                        </td>
                                        <td></td>
                                    </tr>
                                ])
                            )
                        }
                        {/* <tr>{ lecModal ? <LecModal setLecModal={ setLecModal }/> : null }</tr> */}
                    </tbody>       
                </table>    
            </div>
            <div>
                {/* <input
                    type="file"
                    id="file"
                    onChange={onClickTaskSubmitHandler}
                    multiple="multiple"
                />             */}
            </div>
        </>
    );
}

export default LectureProDetail;
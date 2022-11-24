import { callLectureStuDetailAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


function LectureStuDetail(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureList = lecture.data;  
    const params = useParams();
    const lectureCode = params.lectureCode;


    useEffect(
        () => {
            dispatch(callLectureStuDetailAPI({
                lectureCode : lectureCode
            }));
        },
        []
    );




    return (
        <>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>회차</th>
                            <th>강의 영상</th>
                            <th>과제</th>
                            <th>출석</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(lectureList) && lectureList.map(
                                (lecture) => (
                                    <tr
                                        key={ lecture.lectureCode }
                                    >
                                        <td>{ lecture.lectureWeeks.week || '' }</td>
                                        <td>
                                            <video controls poster="">
                                            <source src={ lecture.lectureWeeks.files.savedRoute || '' }/>
                                            </video>
                                        </td>
                                        <td>
                                            <button
                                                onClick={ onClickTaskSubmitHandler }
                                            >
                                                제출하기
                                            </button>
                                        </td>
                                        <td></td>
                                    </tr>
                                )
                            )
                        }
 
                    </tbody>       
                </table>    
                    
            </div>
        </>
    );
}

export default LectureStuDetail;
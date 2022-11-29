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


    //file array null 체크
    // const files = (files) => {
    //    const files = [];

    //    if(files != null){
    //     for(var i=0; i<files.length; i++){
    //         result.push(<p>{ files[i] }</p>)
    //     }
    //    }
        
    // }




    //파일 등록 화면 넘기기
    const onClickLectureRegistHandler = () => {
        navigate("/layout/fileRegistPro", { replace : false });
    }


 

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
                        <col width="15%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>회차</th>
                            <th>기간</th>
                            <th>강의 영상</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(lectureDetail?.lectureWeeks) && lectureDetail?.lectureWeeks.map(
                                (lecture) => ([
                                    <tr
                                        key={ lecture.lectureWeekCode }
                                    >
                                        <td>{ lecture.week || '' }</td>
                                        <td>{ lecture.startDate || '' } ~ { lecture.endDate || '' }</td>
                                        <td>{ lecture.originName || '' }</td>
                                    </tr>
                                ])
                            )
                        }
                    </tbody>       
                </table>    
                <div>
                    <button
                        style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                        onClick={ onClickLectureRegistHandler }
                    >
                        강좌 자료 업로드
                    </button>
                </div>
            </div>

        </>
    );
}

export default LectureProDetail;
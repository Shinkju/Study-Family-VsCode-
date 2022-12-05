import { callLectureProDetailAPI } from '../../apis/LectureApiCalls';
import { useEffect } from "react";
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


    //파일 등록 화면 넘기기
    const onClickLectureRegistHandler = () => {
        navigate("/layout/fileRegistPro", { replace : false });
    }

    //강좌 공지사항 화면 넘기기
    const onClickSubNoticeHandler = () => {
        navigate("/layout/Subnotice", { replace : false });
    }

    //강좌 QA 게시판 화면 넘기기
    const onClickQaHandler = () => {

    }

    //쪽지함 화면 넘기기
    const onClickMsgHandler = () => {
        navigate("/layout/msgReceiveList", { replace : false });
    }
 

    return(
        <>
           
            <div>
                <div style={{ marginLeft:450 }}>
                        <h2
                            style={{  float:'left', cursor:"pointer"  }}
                            onClick={ onClickSubNoticeHandler }
                        >
                            공지 게시판 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </h2>
                        <h2
                            style={{  float:'left', cursor:"pointer"   }}
                            onClick={ onClickQaHandler }
                        >
                            Q&A 게시판
                        </h2>
                        <h2
                            style={{  float:'right', paddingRight:100, cursor:"pointer" }}
                            onClick={ onClickMsgHandler }
                        >
                            💌
                        </h2>
                </div><br/>
                <div>
                <h3
                    style={{ marginLeft:350, paddingTop:80 }}
                >
                    { lectureDetail?.lectureName }  /  { lectureDetail?.professor?.professorName }</h3>
                </div>
            </div><br/>
            <div>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
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
import { callLectureStuDetailAPI } from '../../apis/LectureApiCalls';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import lectureListStuCSS from './LecModal.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import LecModal from './LecModal';



function LectureStuDetail(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lecture = useSelector(state => state.lectureReducer);
    const lectureDetail = lecture.data;
    const params = useParams();
    const lectureCode = params.lectureCode;
    const [lecModal, setLecModal] = useState(false);    //모달 띄우기 true/false
    const [array, setArray] = useState(0);  

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


    //과제 파일 미리보기 + 업로드
    const onClickTaskSubmitHandler = (e) => {
        console.log(e.target.file.data)
        // setFile(e.target.file);

    }


    // const video = [{ lectureDetail }];
    //video player
    const openPopupHandler = () => {

        // for(var i=0; i <= lectureDetail.lectureWeeks.length; i++){
        //     if(array(i)){
        //         setLecModal(true);
        //         return;
        //     }
            
        // }
        setLecModal(true);
    }
    



    return (
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
                                (lectureWeek) => ([<>
                                    <tr
                                        key={ lectureWeek.lectureWeekCode }
                                    >
                                        <td>{ lectureWeek.week || '' }</td>
                                        <td>{ lectureWeek.startDate } ~ { lectureWeek.endDate }</td>
                                        <td>
                                            <button 
                                                onClick={ openPopupHandler }
                                            >
                                                강의 시청
                                            </button>
                                        </td>
                                        <td></td>
                                    </tr><tr>{ lecModal ? <LecModal setLecModal={ setLecModal }/> : null }</tr>
                                </>])
                            )
                        }
                        
                    </tbody>       
                </table>    
            </div>
            <div>
                <input
                    type="file"
                    id="file"
                    onChange={onClickTaskSubmitHandler}
                    multiple="multiple"
                />            
            </div>
        </>
    );
}


export default LectureStuDetail;
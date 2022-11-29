import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callLectureStuListAPI } from '../../apis/LectureApiCalls';
import lectureListStuCSS from './LectureStu_module.css';
import { decodeJwt } from '../../utils/tokenUtils';

function LectureStuList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lectures = useSelector(state => state.lectureReducer);
    const lectureList = lectures.data;     
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  


    useEffect(() => {
        if(token){


            dispatch(callLectureStuListAPI({
                studentNo: token.studentNo
            }));
        }
    },[]);

    //학생 강의실 상세 페이지 넘기기
    const onClickTableTr = (lectureCode) => {

        navigate(`/layout/lectureStuDetail/${lectureCode}`, { replace : false });
    }


    return(
        <>
            <br/><br/><br/>
            <div>
                <table>
                    <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>강좌 명</th>
                            <th>담당 교수</th>
                            <th>담당 학과</th>
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
                                        <td>{ lecture.lectureName || '' }</td>
                                        <td>{ lecture.professor.professorName || '' }</td>
                                        <td>{ lecture.subject.subTitle || '' }</td>
                                        <td><button
                                                onClick={ () => onClickTableTr(lecture.lectureCode) }
                                            >
                                                입장하기
                                        </button></td>
                                    </tr>
                                )
                            )
                        }
 
                    </tbody>       
                </table>    
                    
            </div>
        </>
    )
}

export default LectureStuList;
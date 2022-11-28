import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callLectureProListAPI } from '../../apis/LectureAPICalls';
import lectureListStuCSS from './LectureStu_module.css';
import { decodeJwt } from '../../utils/tokenUtils';
// import lectureProDetail from './LectureProDetail';


function LectureProuList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lectures = useSelector(state => state.lectureReducer);
    const lectureList = lectures.data;     
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  


    useEffect(() => {
        if(token){
            dispatch(callLectureProListAPI({
                professorCode: token.professorCode
            }));
        }
    },
    []);

    //교수 강의실 상세 페이지 넘기기
    const onClickTableTr = (lectureCode) => {

       navigate(`/layout/lectureProDetail/${lectureCode}`, { replace : false });
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
                                (lectures) => (
                                    <tr
                                        key={ lectures.lectureCode }
                                    >
                                        <td >{ lectures.lectureName || '' }</td>
                                        <td>{ lectures.professor.professorName || '' }</td>
                                        <td>{ lectures.subject.subTitle || '' }</td>
                                        <td><button
                                                onClick={ () => onClickTableTr(lectures.lectureCode) }
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

export default LectureProuList;
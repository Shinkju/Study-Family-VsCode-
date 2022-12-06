import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callProfessorLectureListAPI } from '../../apis/ProfessorApiCalls';
import lectureListCSS from '../Student/MyPage.module.css';
import { decodeJwt } from '../../utils/tokenUtils';


function ProfessorLectureList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lectures = useSelector(state => state.professorReducer);
    const lectureList = lectures.data;     
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  

    useEffect(() => {
        if(token){
            dispatch(callProfessorLectureListAPI({
                professorCode: token.professorCode
            }));
        }
    },
    []);

    //교수 강의실 상세 페이지 넘기기
    const onClickTableTr = (lectureCode) => {

       navigate(`/layout/professorStudentList/${lectureCode}`, { replace : false });
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
                            <th>담당 학과</th>
                            <th>개설일자</th>
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
                                        <td>{ lectures.subject.subTitle || '' }</td>
                                        <td>{ lectures.openingDate || '' }</td>
                                        <td><button
                                                onClick={ () => onClickTableTr(lectures.lectureCode) }
                                            >
                                                학생평가
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

export default ProfessorLectureList;